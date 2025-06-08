package com.carrydrop.security

import com.carrydrop.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
class CustomUserDetailsService(
    private val userRepository: UserRepository
) : UserDetailsService {

    @Transactional(readOnly = true)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByEmail(username)
            .orElseThrow { UsernameNotFoundException("User not found with email: $username") }
        return CustomUserDetails(user)
    }

    @Transactional(readOnly = true)
    fun loadUserById(id: String): UserDetails {
        val user = userRepository.findById(UUID.fromString(id))
            .orElseThrow { UsernameNotFoundException("User not found with id: $id") }
        return CustomUserDetails(user)
    }
} 