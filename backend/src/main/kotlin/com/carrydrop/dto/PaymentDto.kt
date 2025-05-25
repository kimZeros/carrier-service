package com.carrydrop.dto

import jakarta.validation.constraints.NotNull
import java.util.UUID

data class CreatePaymentIntentRequest(
    @field:NotNull(message = "예약 ID를 입력해주세요.")
    val reservationId: UUID
    // 필요시 다른 정보 추가 (예: 통화, 금액 - 서버에서 조회 가능)
)

data class PaymentIntentResponse(
    val clientSecret: String, // Stripe Payment Intent의 client secret
    val reservationId: UUID,
    val amount: Int,
    val currency: String
) 