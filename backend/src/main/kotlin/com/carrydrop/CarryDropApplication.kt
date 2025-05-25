package com.carrydrop

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling // 스케줄링 활성화

@SpringBootApplication
@EnableScheduling // 스케줄링 활성화 어노테이션 추가
class CarryDropApplication

fun main(args: Array<String>) {
    runApplication<CarryDropApplication>(*args)
} 