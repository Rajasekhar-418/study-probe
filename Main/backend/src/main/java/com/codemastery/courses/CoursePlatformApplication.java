package com.codemastery.courses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the CodeMastery Course Platform Spring Boot application.
 *
 * Run with: mvn spring-boot:run
 * The server starts on port 8080 with REST endpoints under /api.
 */
@SpringBootApplication
public class CoursePlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoursePlatformApplication.class, args);
    }
}
