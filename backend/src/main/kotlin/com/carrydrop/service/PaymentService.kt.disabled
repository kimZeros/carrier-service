package com.carrydrop.service

import com.carrydrop.dto.CreatePaymentIntentRequest
import com.carrydrop.dto.PaymentIntentResponse
import com.carrydrop.entity.ReservationStatus
import com.carrydrop.repository.ReservationRepository
import com.stripe.Stripe
import com.stripe.model.PaymentIntent
import com.stripe.param.PaymentIntentCreateParams
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class PaymentService(
    @Value("\${stripe.api.key}") private val stripeApiKey: String,
    private val reservationRepository: ReservationRepository,
    private val reservationService: ReservationService
) {

    @PostConstruct
    fun init() {
        Stripe.apiKey = stripeApiKey
    }

    @Transactional
    fun createPaymentIntent(request: CreatePaymentIntentRequest, userEmail: String): PaymentIntentResponse {
        val reservation = reservationRepository.findById(request.reservationId)
            .orElseThrow { RuntimeException("Reservation not found with id: ${request.reservationId}") }

        if (reservation.user.email != userEmail) {
            throw IllegalAccessException("You are not authorized to pay for this reservation.")
        }

        if (reservation.status == ReservationStatus.PAID || reservation.status == ReservationStatus.CANCELLED) {
            throw IllegalStateException("Payment cannot be processed for reservations that are already PAID or CANCELLED.")
        }
        
        val amountInCents = reservation.price * 100

        val params = PaymentIntentCreateParams.builder()
            .setAmount(amountInCents.toLong())
            .setCurrency("jpy")
            .putMetadata("reservation_id", reservation.id.toString())
            .putMetadata("user_email", userEmail)
            .setAutomaticPaymentMethods(
                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                    .setEnabled(true)
                    .build()
            )
            .build()

        val paymentIntent = PaymentIntent.create(params)

        return PaymentIntentResponse(
            clientSecret = paymentIntent.clientSecret,
            reservationId = reservation.id!!,
            amount = reservation.price,
            currency = paymentIntent.currency
        )
    }
} 