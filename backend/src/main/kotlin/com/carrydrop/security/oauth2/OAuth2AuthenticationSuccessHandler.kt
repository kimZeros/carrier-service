package com.carrydrop.security.oauth2

import com.carrydrop.repository.UserRepository
import com.carrydrop.security.jwt.JwtTokenProvider
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import org.springframework.stereotype.Component
import org.springframework.web.util.UriComponentsBuilder

@Component
class OAuth2AuthenticationSuccessHandler(
    private val jwtTokenProvider: JwtTokenProvider,
    private val userRepository: UserRepository,
    @Value("\${app.oauth2.redirect-uri:http://localhost:3000/oauth2/redirect}")
    private val redirectUri: String,
    @Value("\${jwt.expiration-ms}") private val jwtExpirationMs: Int
) : SimpleUrlAuthenticationSuccessHandler() {

    private val logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler::class.java)

    override fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ) {
        val oAuth2User = authentication.principal as OAuth2User
        val email = oAuth2User.attributes["email"] as? String
            ?: throw IllegalArgumentException("Email not found from OAuth2 provider")

        val user = userRepository.findByEmail(email)
            .orElseThrow { IllegalArgumentException("User not found with email: $email after OAuth2 authentication") }

        val token = jwtTokenProvider.generateToken(user)

        val cookie = Cookie("accessToken", token)
        cookie.path = "/"
        cookie.isHttpOnly = true
        cookie.maxAge = jwtExpirationMs / 1000
        response.addCookie(cookie)

        val targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
            .build().toUriString()
        
        clearAuthenticationAttributes(request)
        logger.info("OAuth2 authentication successful for user: ${user.email}, redirecting to: $targetUrl")
        redirectStrategy.sendRedirect(request, response, targetUrl)
    }
} 