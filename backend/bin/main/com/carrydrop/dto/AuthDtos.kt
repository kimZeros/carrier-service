package com.carrydrop.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

// 로그인 요청 DTO
data class LoginRequest(
    @field:NotBlank(message = "Email cannot be blank")
    @field:Email(message = "Invalid email format")
    val email: String,

    @field:NotBlank(message = "Password cannot be blank")
    val password: String
)

// 로그인 응답 DTO
data class LoginResponse(
    val accessToken: String,
    val tokenType: String = "Bearer",
    val userId: java.util.UUID?,
    val email: String?,
    val name: String? // 필요에 따라 다른 사용자 정보 추가
)

// 회원가입 요청 DTO
data class SignupRequest(
    @field:NotBlank(message = "Name cannot be blank")
    @field:Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    val name: String,

    @field:NotBlank(message = "Email cannot be blank")
    @field:Email(message = "Invalid email format")
    val email: String,

    @field:NotBlank(message = "Password cannot be blank")
    @field:Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    val password: String
)

// API 응답용 기본 DTO (선택 사항)
data class ApiResponse(
    val success: Boolean,
    val message: String,
    val data: Any? = null
) 