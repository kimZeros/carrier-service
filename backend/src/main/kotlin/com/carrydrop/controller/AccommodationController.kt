package com.carrydrop.controller

import com.carrydrop.dto.AccommodationDto
import com.carrydrop.mapper.AccommodationMapper
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/accommodations", produces = [MediaType.APPLICATION_JSON_VALUE])
@CrossOrigin(origins = ["http://localhost:3000"])
class AccommodationController(
    private val accommodationMapper: AccommodationMapper
) {
    
    @GetMapping("/active", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getActiveAccommodations(): ResponseEntity<List<AccommodationDto>> {
        val accommodations = accommodationMapper.findActiveAccommodations()
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(accommodations)
    }
    
    @GetMapping(produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getAllAccommodations(): ResponseEntity<List<AccommodationDto>> {
        val accommodations = accommodationMapper.findAllAccommodations()
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(accommodations)
    }
    
    @GetMapping("/{id}", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getAccommodationById(@PathVariable id: String): ResponseEntity<AccommodationDto> {
        val accommodation = accommodationMapper.findById(id)
        return if (accommodation != null) {
            ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(accommodation)
        } else {
            ResponseEntity.notFound().build()
        }
    }
} 