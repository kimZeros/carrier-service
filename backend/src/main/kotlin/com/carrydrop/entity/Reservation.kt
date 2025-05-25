package com.carrydrop.entity

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "reservations") // 테이블명 명시
data class Reservation(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @ManyToOne(fetch = FetchType.LAZY, optional = false) // User는 필수, 지연 로딩
    @JoinColumn(name = "user_id", nullable = false) // 외래키 컬럼명 명시
    val user: User,

    @Column(nullable = false)
    val fromPlace: String,

    @Column(nullable = false)
    val toPlace: String,

    @Column(nullable = false)
    val pickUpTime: LocalDateTime,

    @Column(nullable = false)
    val dropOffTime: LocalDateTime,

    @Column(nullable = false)
    val price: Int, // 데이터 타입 Int로 명시됨

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: ReservationStatus = ReservationStatus.PENDING,

    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    var updatedAt: LocalDateTime = LocalDateTime.now() // updatedAt 추가 (업데이트 시간 기록)
) {
    // JPA 엔티티에서 변경이 있을 때 updatedAt 필드를 자동으로 업데이트하기 위한 훅
    @PreUpdate
    fun onUpdate() {
        updatedAt = LocalDateTime.now()
    }
} 