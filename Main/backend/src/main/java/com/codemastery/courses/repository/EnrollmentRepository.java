package com.codemastery.courses.repository;

import com.codemastery.courses.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for Enrollment entities.
 */
@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByCourseId(Long courseId);

    List<Enrollment> findByStudentName(String studentName);

    boolean existsByCourseIdAndStudentName(Long courseId, String studentName);
}
