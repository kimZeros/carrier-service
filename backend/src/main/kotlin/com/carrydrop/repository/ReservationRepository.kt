package com.carrydrop.repository

import com.carrydrop.entity.Reservation
import com.carrydrop.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ReservationRepository : JpaRepository<Reservation, UUID> {
    fun findByUserOrderByPickUpTimeDesc(user: User): List<Reservation>
    // 필요에 따라 다른 조회 메소드 추가 (예: 특정 기간, 상태별 조회)
} 