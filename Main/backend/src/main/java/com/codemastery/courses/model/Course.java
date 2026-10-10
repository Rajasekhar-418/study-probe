package com.codemastery.courses.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Course entity — represents a sellable course on the platform.
 *
 * Maps to the "courses" table in MySQL. Hibernate auto-creates/updates
 * the schema on startup (ddl-auto=update).
 */
@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 300)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(length = 150)
    private String instructor;

    @Column(nullable = false, precision = 10, scale = 2)
    private Double price;

    @Column(length = 100)
    private String category;

    @Column(precision = 3, scale = 2)
    @Builder.Default
    private Double rating = 0.0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
