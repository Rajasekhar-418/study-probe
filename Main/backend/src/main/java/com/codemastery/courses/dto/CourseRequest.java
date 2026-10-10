package com.codemastery.courses.dto;

import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Request body for creating a new course via POST /api/courses.
 *
 * Validation annotations ensure data integrity at the API boundary.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 300, message = "Title must not exceed 300 characters")
    private String title;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @NotBlank(message = "Instructor name is required")
    @Size(max = 150, message = "Instructor name must not exceed 150 characters")
    private String instructor;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private Double price;

    @Size(max = 100, message = "Category must not exceed 100 characters")
    private String category;

    @DecimalMin(value = "0.0", message = "Rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5.0")
    private Double rating;
}
