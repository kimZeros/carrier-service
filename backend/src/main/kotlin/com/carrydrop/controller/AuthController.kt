package com.carrydrop.controller

import com.carrydrop.dto.LoginRequest
import com.carrydrop.dto.LoginResponse
import com.carrydrop.dto.SignupRequest
import com.carrydrop.dto.ApiResponse
import com.carrydrop.entity.User
import com.carrydrop.entity.MemberRole
import com.carrydrop.repository.UserRepository
import com.carrydrop.security.jwt.JwtTokenProvider
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtTokenProvider: JwtTokenProvider,
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {

    @PostMapping("/login")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginRequest): ResponseEntity<*> {
        return try {
            val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    loginRequest.email,
                    loginRequest.password
                )
            )
            SecurityContextHolder.getContext().authentication = authentication
            val userDetails = authentication.principal as org.springframework.security.core.userdetails.UserDetails
            val user = userRepository.findByEmail(userDetails.username).orElse(null)

            val jwt = jwtTokenProvider.generateToken(authentication)
            
            ResponseEntity.ok(LoginResponse(
                accessToken = jwt,
                userId = user?.id,
                email = user?.email,
                name = user?.name
            ))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse(success = false, message = "Login failed: ${e.message}"))
        }
    }

    @PostMapping("/signup")
    fun registerUser(@Valid @RequestBody signupRequest: SignupRequest): ResponseEntity<ApiResponse> {
        if (userRepository.findByEmail(signupRequest.email).isPresent) {
            return ResponseEntity
                .badRequest()
                .body(ApiResponse(success = false, message = "Error: Email is already in use!"))
        }

        // Create new user's account
        val user = User(
            name = signupRequest.name,
            email = signupRequest.email,
            password = passwordEncoder.encode(signupRequest.password),
            role = MemberRole.BRONZE
        )

        userRepository.save(user)
        return ResponseEntity.ok(ApiResponse(success = true, message = "User registered successfully!"))
    }
} 