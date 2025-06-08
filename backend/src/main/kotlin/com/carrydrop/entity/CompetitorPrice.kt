package com.carrydrop.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "competitor_prices")
class CompetitorPrice(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    var id: UUID? = null,

    @Column(nullable = false, length = 100)
    var competitor: String,

    @Column(nullable = false, length = 100)
    var serviceType: String,

    @Column(nullable = false, length = 200)
    var fromLocation: String,

    @Column(nullable = false, length = 200)
    var toLocation: String,

    @Column(nullable = false, precision = 10, scale = 2)
    var price: BigDecimal,

    @Column
    var estimatedTime: Int?, // 분 단위

    @Column(nullable = false, length = 3)
    var currency: String = "JPY",

    @Column(nullable = false)
    var isActive: Boolean = true,

    @Column(nullable = false)
    var lastChecked: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column
    var updatedAt: LocalDateTime? = null
) {
    @PreUpdate
    fun preUpdate() {
        updatedAt = LocalDateTime.now()
        lastChecked = LocalDateTime.now()
    }
} 