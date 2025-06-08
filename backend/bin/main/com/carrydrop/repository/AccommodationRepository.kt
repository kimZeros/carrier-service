package com.carrydrop.repository

import com.carrydrop.entity.Accommodation
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface AccommodationRepository : JpaRepository<Accommodation, UUID> {
    
    fun findByIsActive(isActive: Boolean, pageable: Pageable): Page<Accommodation>
    
    @Query("SELECT a FROM Accommodation a WHERE " +
           "(:isActive IS NULL OR a.isActive = :isActive) AND " +
           "(:region IS NULL OR a.address LIKE %:region%)")
    fun findByFilters(
        @Param("isActive") isActive: Boolean?,
        @Param("region") region: String?,
        pageable: Pageable
    ): Page<Accommodation>
    
    fun findByNameContaining(name: String, pageable: Pageable): Page<Accommodation>
    
    fun findByAddressContaining(address: String, pageable: Pageable): Page<Accommodation>
    
    fun countByIsActiveTrue(): Long
} 