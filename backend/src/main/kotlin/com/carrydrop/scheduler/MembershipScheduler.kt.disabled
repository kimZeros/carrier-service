package com.carrydrop.scheduler

import com.carrydrop.entity.MemberRole
import com.carrydrop.entity.ReservationStatus
import com.carrydrop.repository.ReservationRepository
import com.carrydrop.repository.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Component
class MembershipScheduler(
    private val userRepository: UserRepository,
    private val reservationRepository: ReservationRepository
) {
    private val logger = LoggerFactory.getLogger(MembershipScheduler::class.java)

    // 매일 새벽 3시에 실행 (0 3 * * *)
    @Scheduled(cron = "0 0 3 * * *") // 초 분 시 일 월 요일
    @Transactional
    fun updateUserRoles() {
        logger.info("Starting scheduled task: updateUserRoles at ${LocalDateTime.now()}")
        val users = userRepository.findAll()
        val oneYearAgo = LocalDateTime.now().minusYears(1)

        users.forEach { user ->
            // RED 등급은 초대 전용이므로 자동 업데이트에서 제외 (또는 별도 로직)
            if (user.role == MemberRole.RED) {
                return@forEach // continue
            }

            val paidReservationsLastYear = reservationRepository.findByUserOrderByPickUpTimeDesc(user)
                .filter { it.status == ReservationStatus.PAID && it.pickUpTime.isAfter(oneYearAgo) }
                .count()

            val previousRole = user.role
            val newRole = when {
                paidReservationsLastYear >= 10 -> MemberRole.GOLD
                paidReservationsLastYear >= 3  -> MemberRole.SILVER
                else -> MemberRole.BRONZE // 기본 등급 또는 강등 (정책에 따라)
            }

            if (newRole != previousRole) {
                // GOLD 등급으로 승급 시, 또는 SILVER -> GOLD 와 같이 더 높은 등급으로만 승급하도록 정책을 정할 수 있음
                // 여기서는 계산된 등급으로 바로 변경
                user.role = newRole
                userRepository.save(user)
                logger.info("User ${user.email} role updated from $previousRole to $newRole (Paid reservations last year: $paidReservationsLastYear)")
            }
        }
        logger.info("Finished scheduled task: updateUserRoles at ${LocalDateTime.now()}")
    }
} 