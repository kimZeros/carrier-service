package com.carrydrop.service

import com.carrydrop.dto.CreateReservationRequest
import com.carrydrop.dto.ReservationResponse
import com.carrydrop.dto.UpdateReservationStatusRequest
import com.carrydrop.entity.Reservation
import com.carrydrop.entity.ReservationStatus
import com.carrydrop.entity.User
import com.carrydrop.repository.ReservationRepository
import com.carrydrop.repository.UserRepository
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import java.util.UUID

@Service
class ReservationService(
    private val reservationRepository: ReservationRepository,
    private val userRepository: UserRepository
    // private val qrCodeService: QrCodeService // QR 코드 생성 서비스 (별도 구현 필요)
) {

    @Transactional
    fun createReservation(request: CreateReservationRequest, userEmail: String): ReservationResponse {
        val user = userRepository.findByEmail(userEmail)
            .orElseThrow { RuntimeException("User not found with email: $userEmail") } // 혹은 적절한 예외 처리

        // 비즈니스 로직 검증 (예: dropOffTime > pickUpTime)
        if (request.dropOffTime.isBefore(request.pickUpTime) || request.dropOffTime == request.pickUpTime) {
            throw IllegalArgumentException("Drop-off time must be after pick-up time.")
        }
        
        // TODO: 가격 계산 로직 (요청의 price를 그대로 사용할지, 서버에서 계산할지 결정)
        // 여기서는 요청의 price를 사용한다고 가정

        val reservation = Reservation(
            user = user,
            fromPlace = request.fromPlace,
            toPlace = request.toPlace,
            pickUpTime = request.pickUpTime,
            dropOffTime = request.dropOffTime,
            price = request.price, // TODO: 사용자 등급에 따른 할인 적용 필요 (MemberRole)
            status = ReservationStatus.PENDING // 초기 상태는 PENDING
        )
        val savedReservation = reservationRepository.save(reservation)
        
        // val qrCodeValue = qrCodeService.generateQrCodeValue(savedReservation.id!!) // QR 코드 생성
        val qrCodeValue = "QR_CODE_FOR_${savedReservation.id}" // 임시 QR 코드 값

        return mapToResponse(savedReservation, qrCodeValue)
    }

    @Transactional(readOnly = true)
    @PreAuthorize("isAuthenticated()") // 인증된 사용자만 접근 가능
    fun getMyReservations(userEmail: String): List<ReservationResponse> {
        val user = userRepository.findByEmail(userEmail)
            .orElseThrow { RuntimeException("User not found") }
        return reservationRepository.findByUserOrderByPickUpTimeDesc(user)
            .map { mapToResponse(it, "QR_CODE_FOR_${it.id}") } // 임시 QR
    }

    @Transactional(readOnly = true)
    @PreAuthorize("isAuthenticated()")
    fun getReservationById(reservationId: UUID, userEmail: String): ReservationResponse {
        val reservation = reservationRepository.findById(reservationId)
            .orElseThrow { RuntimeException("Reservation not found with id: $reservationId") }
        
        // 자신의 예약만 조회 가능하도록 검증
        if (reservation.user.email != userEmail) {
            throw IllegalAccessException("You are not authorized to view this reservation.")
        }
        return mapToResponse(reservation, "QR_CODE_FOR_${reservation.id}") // 임시 QR
    }
    
    @Transactional
    @PreAuthorize("hasRole('ADMIN') or @reservationService.isOwner(#reservationId, principal.username)") // 관리자 또는 예약 소유주
    fun updateReservationStatus(
        reservationId: UUID,
        request: UpdateReservationStatusRequest
        // userEmail: String // (선택) 호출 주체가 소유자인지 추가 검증 시
    ): ReservationResponse {
        val reservation = reservationRepository.findById(reservationId)
            .orElseThrow { RuntimeException("Reservation not found") }
        
        // TODO: 상태 변경 로직 (예: PAID -> IN_TRANSIT, 관리자만 CANCELLED 가능 등)
        // 현재는 요청된 상태로 바로 변경
        reservation.status = request.status
        reservation.updatedAt = LocalDateTime.now() // updatedAt 갱신
        val updatedReservation = reservationRepository.save(reservation)
        return mapToResponse(updatedReservation, "QR_CODE_FOR_${updatedReservation.id}")
    }

    // 서비스 내에서 예약 소유주인지 확인하는 메소드 (SpEL에서 사용 위함)
    fun isOwner(reservationId: UUID, userEmail: String): Boolean {
        val reservation = reservationRepository.findById(reservationId).orElse(null)
        return reservation?.user?.email == userEmail
    }


    private fun mapToResponse(reservation: Reservation, qrCodeValue: String?): ReservationResponse {
        return ReservationResponse(
            id = reservation.id!!,
            userId = reservation.user.id!!,
            userEmail = reservation.user.email,
            userName = reservation.user.name,
            fromPlace = reservation.fromPlace,
            toPlace = reservation.toPlace,
            pickUpTime = reservation.pickUpTime,
            dropOffTime = reservation.dropOffTime,
            price = reservation.price,
            status = reservation.status,
            createdAt = reservation.createdAt,
            updatedAt = reservation.updatedAt,
            qrCodeValue = qrCodeValue
        )
    }
} 