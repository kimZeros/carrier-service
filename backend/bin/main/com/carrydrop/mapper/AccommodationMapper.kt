package com.carrydrop.mapper

import com.carrydrop.dto.AccommodationDto
import org.apache.ibatis.annotations.Mapper

@Mapper
interface AccommodationMapper {
    
    fun findActiveAccommodations(): List<AccommodationDto>
    
    fun findAllAccommodations(): List<AccommodationDto>
    
    fun findById(id: String): AccommodationDto?
} 