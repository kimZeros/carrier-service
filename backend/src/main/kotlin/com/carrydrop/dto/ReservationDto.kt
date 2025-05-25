package com.carrydrop.dto

import com.carrydrop.entity.ReservationStatus
import jakarta.validation.constraints.Future
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Positive
import java.time.LocalDateTime
import java.util.UUID

data class CreateReservationRequest(
    @field:NotBlank(message = "출발지를 입력해주세요.")
    val fromPlace: String,

    @field:NotBlank(message = "도착지를 입력해주세요.")
    val toPlace: String,

    @field:NotNull(message = "픽업 시간을 입력해주세요.")
    @field:Future(message = "픽업 시간은 현재 시간 이후여야 합니다.")
    val pickUpTime: LocalDateTime,

    @field:NotNull(message = "도착 시간을 입력해주세요.")
    @field:Future(message = "도착 시간은 현재 시간 이후여야 합니다.")
    val dropOffTime: LocalDateTime, // pickUpTime 이후인지 등에 대한 비즈니스 검증은 서비스 레이어에서

    @field:Positive(message = "가격은 0보다 커야 합니다.")
    val price: Int
)

data class ReservationResponse(
    val id: UUID,
    val userId: UUID,
    val userEmail: String, // 사용자 식별을 위해 추가
    val userName: String?,  // 사용자 이름 추가
    val fromPlace: String,
    val toPlace: String,
    val pickUpTime: LocalDateTime,
    val dropOffTime: LocalDateTime,
    val price: Int,
    val status: ReservationStatus,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
    val qrCodeValue: String? = null // QR 코드 값 (생성 시 포함)
)

data class UpdateReservationStatusRequest(
    @field:NotNull(message = "변경할 상태를 입력해주세요.")
    val status: ReservationStatus
) 