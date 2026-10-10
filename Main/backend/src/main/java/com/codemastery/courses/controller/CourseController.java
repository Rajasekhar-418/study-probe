package com.codemastery.courses.controller;

import com.codemastery.courses.dto.ApiResponse;
import com.codemastery.courses.dto.CourseRequest;
import com.codemastery.courses.dto.EnrollmentRequest;
import com.codemastery.courses.model.Course;
import com.codemastery.courses.model.Enrollment;
import com.codemastery.courses.service.CourseService;
import com.codemastery.courses.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the CodeMastery Course Platform.
 *
 * All endpoints are under /api and have CORS enabled for the React frontend
 * (running on localhost:5173 during development).
 *
 * Endpoints:
 *   GET    /api/courses              — fetch all courses
 *   GET    /api/courses/{id}         — fetch a course by ID
 *   GET    /api/courses?category=    — filter courses by category
 *   POST   /api/courses              — create a new course
 *   GET    /api/enrollments          — fetch all enrollments
 *   POST   /api/enrollments          — enroll a student in a course
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private EnrollmentService enrollmentService;

    // ===================== Course Endpoints =====================

    /**
     * GET /api/courses — fetch all courses, optionally filtered by category.
     */
    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<List<Course>>> getAllCourses(
            @RequestParam(required = false) String category) {

        List<Course> courses = (category != null && !category.isBlank())
                ? courseService.getCoursesByCategory(category)
                : courseService.getAllCourses();

        return ResponseEntity.ok(
                ApiResponse.success("Courses retrieved successfully", courses));
    }

    /**
     * GET /api/courses/{id} — fetch a single course by its ID.
     */
    @GetMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<Course>> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Course retrieved successfully", course));
    }

    /**
     * POST /api/courses — create a new course.
     * Request body is validated via @Valid against CourseRequest constraints.
     */
    @PostMapping("/courses")
    public ResponseEntity<ApiResponse<Course>> createCourse(
            @Valid @RequestBody CourseRequest request) {

        Course created = courseService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.success("Course created successfully", created));
    }

    // ===================== Enrollment Endpoints =====================

    /**
     * GET /api/enrollments — fetch all enrollments, optionally filtered by student name.
     */
    @GetMapping("/enrollments")
    public ResponseEntity<ApiResponse<List<Enrollment>>> getAllEnrollments(
            @RequestParam(required = false) String studentName) {

        List<Enrollment> enrollments = (studentName != null && !studentName.isBlank())
                ? enrollmentService.getEnrollmentsByStudent(studentName)
                : enrollmentService.getAllEnrollments();

        return ResponseEntity.ok(
                ApiResponse.success("Enrollments retrieved successfully", enrollments));
    }

    /**
     * POST /api/enrollments — enroll a student in a course.
     * Request body is validated via @Valid against EnrollmentRequest constraints.
     */
    @PostMapping("/enrollments")
    public ResponseEntity<ApiResponse<Enrollment>> enroll(
            @Valid @RequestBody EnrollmentRequest request) {

        Enrollment enrollment = enrollmentService.enroll(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.success("Enrollment successful", enrollment));
    }

    // ===================== Exception Handlers =====================

    /**
     * Handle illegal argument (e.g., course not found).
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ApiResponse.error(ex.getMessage()));
    }

    /**
     * Handle illegal state (e.g., student already enrolled).
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponse.error(ex.getMessage()));
    }
}
