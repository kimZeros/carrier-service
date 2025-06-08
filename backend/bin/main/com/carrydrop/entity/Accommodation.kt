package com.carrydrop.entity

import jakarta.persistence.*
import java.time.LocalDateTime
import java.time.LocalTime
import java.util.UUID

@Entity
@Table(name = "accommodations")
data class Accommodation(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false)
    var address: String,

    @Column(nullable = true)
    var detailAddress: String? = null,

    // 에어비앤비 등의 경우 도어락 비밀번호
    @Column(nullable = true)
    var accessCode: String? = null,

    // 열쇠 보관함 위치 등
    @Column(nullable = true)
    var accessInstructions: String? = null,

    @Column(nullable = false)
    var latitude: Double,

    @Column(nullable = false)
    var longitude: Double,

    // 배송 가능 시간대
    @Column(nullable = false)
    var deliveryStartTime: LocalTime = LocalTime.of(9, 0),

    @Column(nullable = false)
    var deliveryEndTime: LocalTime = LocalTime.of(21, 0),

    // 지역별 배송비 정책
    @Column(nullable = false)
    var deliveryFee: Int = 0,

    @Column(nullable = false)
    var isActive: Boolean = true,

    @Column(nullable = true)
    var notes: String? = null,

    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    @PreUpdate
    fun onUpdate() {
        updatedAt = LocalDateTime.now()
    }
} 