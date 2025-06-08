package com.carrydrop.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.nio.charset.StandardCharsets

@Configuration
class WebConfig : WebMvcConfigurer {

    @Bean
    fun stringHttpMessageConverter(): StringHttpMessageConverter {
        return StringHttpMessageConverter(StandardCharsets.UTF_8)
    }

    @Bean
    fun mappingJackson2HttpMessageConverter(): MappingJackson2HttpMessageConverter {
        val converter = MappingJackson2HttpMessageConverter()
        converter.defaultCharset = StandardCharsets.UTF_8
        return converter
    }

    override fun configureMessageConverters(converters: MutableList<HttpMessageConverter<*>>) {
        converters.add(stringHttpMessageConverter())
        converters.add(mappingJackson2HttpMessageConverter())
    }
} 