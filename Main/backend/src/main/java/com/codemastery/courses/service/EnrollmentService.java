package com.codemastery.courses.service;

import com.codemastery.courses.dto.EnrollmentRequest;
import com.codemastery.courses.model.Course;
import com.codemastery.courses.model.Enrollment;
import com.codemastery.courses.repository.CourseRepository;
import com.codemastery.courses.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Business logic layer for Enrollment operations.
 */
@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    /**
     * Enroll a student in a course.
     *
     * Validates that the course exists and the student is not already enrolled.
     *
     * @throws IllegalArgumentException if the course does not exist.
     * @throws IllegalStateException    if the student is already enrolled.
     */
    public Enrollment enroll(EnrollmentRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Course not found with id: " + request.getCourseId()));

        if (enrollmentRepository.existsByCourseIdAndStudentName(
                request.getCourseId(), request.getStudentName())) {
            throw new IllegalStateException(
                    "Student '" + request.getStudentName() + "' is already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .courseId(course.getId())
                .studentName(request.getStudentName())
                .enrollmentDate(LocalDateTime.now())
                .build();
        return enrollmentRepository.save(enrollment);
    }

    /**
     * Fetch all enrollments for a given student name.
     */
    public List<Enrollment> getEnrollmentsByStudent(String studentName) {
        return enrollmentRepository.findByStudentName(studentName);
    }

    /**
     * Fetch all enrollments for a given course ID.
     */
    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    /**
     * Fetch all enrollments.
     */
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }
}
