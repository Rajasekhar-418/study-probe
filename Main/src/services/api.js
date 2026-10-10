// Service layer for the course platform.
// All data currently comes from local mock data, but every function
// is structured to be a drop-in replacement for real HTTP calls to a
// Java Spring Boot backend running at http://localhost:8080/api.

import { CATEGORIES, COURSES, INSTRUCTORS, ENROLLED_COURSES } from '@/data/mockData';

const API_BASE_URL = 'http://localhost:8080/api';
const USE_MOCK_DATA = true; // Set to false when the Spring Boot backend is live

async function mockDelay(data, ms = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  // ---------- Categories ----------
  async getCategories() {
    if (USE_MOCK_DATA) return mockDelay(CATEGORIES);
    return apiFetch('/categories');
  },

  // ---------- Instructors ----------
  async getInstructors() {
    if (USE_MOCK_DATA) return mockDelay(INSTRUCTORS);
    return apiFetch('/instructors');
  },

  async getInstructorById(id) {
    if (USE_MOCK_DATA) {
      const instructor = INSTRUCTORS.find((i) => i.id === id);
      return mockDelay(instructor || null);
    }
    return apiFetch(`/instructors/${id}`);
  },

  // ---------- Courses ----------
  async getCourses(filters = {}) {
    if (USE_MOCK_DATA) {
      let result = [...COURSES];
      if (filters.categoryId && filters.categoryId !== 'all') {
        result = result.filter((c) => c.categoryId === filters.categoryId);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.subtitle.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        );
      }
      if (filters.sort === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (filters.sort === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      } else if (filters.sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else if (filters.sort === 'popular') {
        result.sort((a, b) => b.studentCount - a.studentCount);
      }
      return mockDelay(result);
    }
    const params = new URLSearchParams(filters);
    return apiFetch(`/courses?${params}`);
  },

  async getCourseById(id) {
    if (USE_MOCK_DATA) {
      const course = COURSES.find((c) => c.id === id);
      return mockDelay(course || null);
    }
    return apiFetch(`/courses/${id}`);
  },

  async getCoursesByCategory(categoryId) {
    if (USE_MOCK_DATA) {
      const result = COURSES.filter((c) => c.categoryId === categoryId);
      return mockDelay(result);
    }
    return apiFetch(`/courses?categoryId=${categoryId}`);
  },

  async getBestsellerCourses() {
    if (USE_MOCK_DATA) {
      return mockDelay(COURSES.filter((c) => c.bestseller));
    }
    return apiFetch('/courses?bestseller=true');
  },

  async createCourse(courseData) {
    if (USE_MOCK_DATA) {
      const newCourse = {
        id: `crs-${Date.now()}`,
        rating: 0,
        reviewCount: 0,
        studentCount: 0,
        bestseller: false,
        ...courseData,
      };
      return mockDelay(newCourse, 600);
    }
    return apiFetch('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  },

  // ---------- Enrollments ----------
  async getEnrolledCourses() {
    if (USE_MOCK_DATA) {
      const enriched = ENROLLED_COURSES.map((enrollment) => {
        const course = COURSES.find((c) => c.id === enrollment.courseId);
        return { ...enrollment, course };
      }).filter((e) => e.course);
      return mockDelay(enriched);
    }
    return apiFetch('/enrollments');
  },

  async enrollInCourse(courseId) {
    if (USE_MOCK_DATA) {
      return mockDelay({ success: true, courseId }, 500);
    }
    return apiFetch('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  },

  async updateProgress(courseId, progress) {
    if (USE_MOCK_DATA) {
      return mockDelay({ success: true, courseId, progress }, 300);
    }
    return apiFetch(`/enrollments/${courseId}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress }),
    });
  },

  // ---------- Cart ----------
  async getCart() {
    if (USE_MOCK_DATA) return mockDelay([]);
    return apiFetch('/cart');
  },

  async addToCart(courseId) {
    if (USE_MOCK_DATA) return mockDelay({ success: true, courseId }, 200);
    return apiFetch('/cart', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  },
};
