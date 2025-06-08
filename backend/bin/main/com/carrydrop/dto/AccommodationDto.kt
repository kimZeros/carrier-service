package com.carrydrop.dto

import java.time.LocalDateTime
import java.time.LocalTime

data class AccommodationDto(
    val id: String? = null,
    val name: String,
    val address: String,
    val detailAddress: String? = null,
    val accessCode: String? = null,
    val accessInstructions: String? = null,
    val latitude: Double,
    val longitude: Double,
    val deliveryStartTime: LocalTime,
    val deliveryEndTime: LocalTime,
    val deliveryFee: Int,
    val isActive: Boolean,
    val notes: String? = null,
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
) 