package com.codemastery.courses.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Enrollment entity — records a student's enrollment in a course.
 *
 * Maps to the "enrollments" table in MySQL.
 */
@Entity
@Table(name = "enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "student_name", nullable = false, length = 150)
    private String studentName;

    @Column(name = "enrollment_date", updatable = false)
    private LocalDateTime enrollmentDate;
}
