package com.carrydrop.security.oauth2

import com.carrydrop.entity.MemberRole
import com.carrydrop.entity.User
import com.carrydrop.repository.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
class CustomOAuth2UserService(
    private val userRepository: UserRepository
) : DefaultOAuth2UserService() {

    private val logger = LoggerFactory.getLogger(CustomOAuth2UserService::class.java)

    @Transactional
    override fun loadUser(userRequest: OAuth2UserRequest): OAuth2User {
        val oAuth2User = super.loadUser(userRequest)
        val registrationId = userRequest.clientRegistration.registrationId

        val attributes = oAuth2User.attributes
        val email = attributes["email"] as? String ?: "${registrationId}_${attributes["id"] ?: UUID.randomUUID().toString()}@carrydrop.com"
        val name = attributes["name"] as? String ?: "User"

        val user = userRepository.findByEmail(email).orElseGet {
            logger.info("New user detected from OAuth2 provider: $registrationId, email: $email")
            val newUser = User(
                email = email,
                name = name,
                role = MemberRole.BRONZE
            )
            userRepository.save(newUser)
        }

        return oAuth2User
    }
} 