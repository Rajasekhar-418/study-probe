package com.codemastery.courses.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Request body for enrolling a student in a course via POST /api/enrollments.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentRequest {

    @NotNull(message = "Course ID is required")
    @Positive(message = "Course ID must be a positive number")
    private Long courseId;

    @NotBlank(message = "Student name is required")
    @Size(max = 150, message = "Student name must not exceed 150 characters")
    private String studentName;
}
