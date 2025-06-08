package com.carrydrop.dto

import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

data class CompetitorPriceDto(
    val id: UUID,
    val competitor: String,
    val serviceType: String,
    val fromLocation: String,
    val toLocation: String,
    val price: BigDecimal,
    val estimatedTime: Int?, // 분 단위
    val currency: String = "JPY",
    val isActive: Boolean,
    val lastChecked: LocalDateTime,
    val createdAt: LocalDateTime
)

data class CreateCompetitorPriceRequest(
    val competitor: String,
    val serviceType: String,
    val fromLocation: String,
    val toLocation: String,
    val price: BigDecimal,
    val estimatedTime: Int?
)

data class UpdateCompetitorPriceRequest(
    val price: BigDecimal,
    val estimatedTime: Int?,
    val isActive: Boolean
)

data class CompetitorComparisonDto(
    val route: String,
    val ourPrice: BigDecimal,
    val competitors: List<CompetitorPriceDto>,
    val averageCompetitorPrice: BigDecimal,
    val priceAdvantage: BigDecimal, // 양수면 우리가 비쌈, 음수면 저렴
    val recommendedPrice: BigDecimal?
) 