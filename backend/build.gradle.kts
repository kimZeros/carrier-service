import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.2.0" // Spring Boot 3.2 버전 명시
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.20" // Kotlin 1.9 버전 명시 (요구사항 1.9 충족)
    kotlin("plugin.spring") version "1.9.20"
    kotlin("plugin.jpa") version "1.9.20"
}

group = "com.carrydrop"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-validation") // 유효성 검사
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.flywaydb:flyway-core") // Flyway (PostgreSQL 지원 포함)

    // JWT 관련 의존성 (Spring Security 6+ 에서는 내장 지원 강화, 필요시 추가)
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5") // 또는 Gson 등

    // OAuth2 Client
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")

    runtimeOnly("org.postgresql:postgresql") // PostgreSQL JDBC 드라이버
    runtimeOnly("com.h2database:h2") // H2 데이터베이스 (개발용)
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")

    implementation("com.stripe:stripe-java:24.0.0") // Stripe SDK
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

// 모든 JPA 엔티티 클래스가 open 되도록 설정 (no-arg plugin 대신 사용 가능)
allOpen {
    annotation("jakarta.persistence.Entity")
    annotation("jakarta.persistence.MappedSuperclass")
    annotation("jakarta.persistence.Embeddable")
}

// Kotlin JPA 플러그인 설정 (no-arg constructor 자동 생성)
noArg {
    annotation("jakarta.persistence.Entity")
} 