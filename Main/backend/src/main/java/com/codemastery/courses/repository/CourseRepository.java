package com.codemastery.courses.repository;

import com.codemastery.courses.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for Course entities.
 *
 * Custom query methods are derived from method names — no JPQL needed.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCategory(String category);

    List<Course> findByBestsellerTrue();

    List<Course> findByRatingGreaterThanEqual(Double rating);
}
