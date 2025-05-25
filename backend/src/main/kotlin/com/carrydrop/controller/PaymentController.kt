package com.carrydrop.controller

import com.carrydrop.dto.CreatePaymentIntentRequest
import com.carrydrop.dto.PaymentIntentResponse
import com.carrydrop.service.PaymentService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/payments")
class PaymentController(
    private val paymentService: PaymentService
) {

    @PostMapping("/create-intent")
    fun createPaymentIntent(
        @Valid @RequestBody request: CreatePaymentIntentRequest,
        @AuthenticationPrincipal principal: UserDetails
    ): ResponseEntity<PaymentIntentResponse> {
        val paymentIntentResponse = paymentService.createPaymentIntent(request, principal.username)
        return ResponseEntity.ok(paymentIntentResponse)
    }

    // TODO: Stripe 웹훅을 처리하는 엔드포인트 추가
    // @PostMapping("/webhook")
    // fun handleStripeWebhook(@RequestBody payload: String, @RequestHeader("Stripe-Signature") sigHeader: String): ResponseEntity<String> {
    //     // 웹훅 처리 로직 (PaymentService 또는 별도 WebhookService 호출)
    //     return ResponseEntity.ok("Webhook received")
    // }
} 