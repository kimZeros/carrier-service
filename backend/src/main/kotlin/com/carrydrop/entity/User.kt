package com.carrydrop.entity

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "users") // 테이블명 명시 (PostgreSQL은 소문자, 스네이크 케이스 선호)
data class User(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @Column(unique = true, nullable = false) // email은 고유하고 null 비허용
    val email: String,

    var name: String? = null,

    @Column(nullable = true) // OAuth2 사용자는 password가 없을 수 있음
    var password: String? = null,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false) // role은 null 비허용
    var role: MemberRole = MemberRole.BRONZE,

    // 양방향 관계 설정, Reservation 엔티티의 'user' 필드와 매핑
    // CascadeType.ALL 과 orphanRemoval=true는 User 삭제 시 연관된 Reservation도 삭제되도록 함 (비즈니스 로직에 따라 조정 필요)
    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val reservations: MutableList<Reservation> = mutableListOf(),

    @Column(nullable = false, updatable = false) // createdAt은 생성 시에만 값 설정, 업데이트 불가
    val createdAt: LocalDateTime = LocalDateTime.now()
) 