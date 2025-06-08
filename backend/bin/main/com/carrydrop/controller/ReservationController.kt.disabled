package com.carrydrop.controller

import com.carrydrop.dto.CreateReservationRequest
import com.carrydrop.dto.ReservationResponse
import com.carrydrop.dto.UpdateReservationStatusRequest
import com.carrydrop.service.ReservationService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails // 또는 CustomUserDetails
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/reservations")
class ReservationController(
    private val reservationService: ReservationService
) {

    @PostMapping
    fun createReservation(
        @Valid @RequestBody request: CreateReservationRequest,
        @AuthenticationPrincipal principal: UserDetails // 현재 인증된 사용자 정보 주입
    ): ResponseEntity<ReservationResponse> {
        // principal.username은 CustomUserDetailsService에서 email로 설정했음
        val reservation = reservationService.createReservation(request, principal.username)
        return ResponseEntity.status(HttpStatus.CREATED).body(reservation)
    }

    @GetMapping("/my")
    fun getMyReservations(
        @AuthenticationPrincipal principal: UserDetails
    ): ResponseEntity<List<ReservationResponse>> {
        val reservations = reservationService.getMyReservations(principal.username)
        return ResponseEntity.ok(reservations)
    }

    @GetMapping("/{id}")
    fun getReservationById(
        @PathVariable id: UUID,
        @AuthenticationPrincipal principal: UserDetails
    ): ResponseEntity<ReservationResponse> {
        val reservation = reservationService.getReservationById(id, principal.username)
        return ResponseEntity.ok(reservation)
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or @reservationService.isOwner(#id, principal.username)")
    fun updateReservationStatus(
        @PathVariable id: UUID,
        @Valid @RequestBody request: UpdateReservationStatusRequest
        // @AuthenticationPrincipal principal: UserDetails // SpEL에서 principal 사용
    ): ResponseEntity<ReservationResponse> {
        val updatedReservation = reservationService.updateReservationStatus(id, request)
        return ResponseEntity.ok(updatedReservation)
    }
} 