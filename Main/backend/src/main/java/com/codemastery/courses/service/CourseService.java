package com.codemastery.courses.service;

import com.codemastery.courses.dto.CourseRequest;
import com.codemastery.courses.model.Course;
import com.codemastery.courses.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Business logic layer for Course operations.
 *
 * The controller delegates here so that validation, default-setting,
 * and persistence concerns stay out of the HTTP layer.
 */
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    /**
     * Fetch all courses from the database.
     */
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    /**
     * Fetch a single course by its ID.
     *
     * @throws IllegalArgumentException if no course exists with the given ID.
     */
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course not found with id: " + id));
    }

    /**
     * Fetch courses filtered by category name.
     */
    public List<Course> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category);
    }

    /**
     * Create and persist a new course from the request DTO.
     * Sets a default rating of 0.0 and the creation timestamp.
     */
    public Course createCourse(CourseRequest request) {
        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .instructor(request.getInstructor())
                .price(request.getPrice())
                .category(request.getCategory())
                .rating(request.getRating() != null ? request.getRating() : 0.0)
                .createdAt(LocalDateTime.now())
                .build();
        return courseRepository.save(course);
    }
}
