import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { api } from '@/services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage] = useState({ name: 'home', params: {} });
  const [cart, setCart] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [isEnrolledMap, setIsEnrolledMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const navigate = useCallback((name, params = {}) => {
    setPage({ name, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const loadEnrollments = useCallback(async () => {
    try {
      const data = await api.getEnrolledCourses();
      setEnrollments(data);
      const map = {};
      data.forEach((e) => {
        map[e.courseId] = true;
      });
      setIsEnrolledMap(map);
    } catch (err) {
      console.error('Failed to load enrollments', err);
    }
  }, []);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  const addToCart = useCallback(
    (course) => {
      setCart((prev) => {
        if (prev.some((c) => c.id === course.id)) {
          showToast('This course is already in your cart', 'info');
          return prev;
        }
        showToast(`"${course.title}" added to cart`);
        return [...prev, course];
      });
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (courseId) => {
      setCart((prev) => prev.filter((c) => c.id !== courseId));
    },
    []
  );

  const clearCart = useCallback(() => setCart([]), []);

  const enrollInCourse = useCallback(
    async (course) => {
      try {
        await api.enrollInCourse(course.id);
        setIsEnrolledMap((prev) => ({ ...prev, [course.id]: true }));
        showToast(`You are now enrolled in "${course.title}"!`);
        setCart((prev) => prev.filter((c) => c.id !== course.id));
        loadEnrollments();
        navigate('dashboard');
      } catch (err) {
        showToast('Failed to enroll. Please try again.', 'error');
      }
    },
    [showToast, navigate, loadEnrollments]
  );

  const checkout = useCallback(async () => {
    for (const course of cart) {
      await api.enrollInCourse(course.id);
    }
    showToast('Enrollment successful! Welcome to your new courses.');
    clearCart();
    loadEnrollments();
    navigate('dashboard');
  }, [cart, showToast, clearCart, loadEnrollments, navigate]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, c) => sum + c.price, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      page,
      navigate,
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      checkout,
      enrollInCourse,
      enrollments,
      isEnrolledMap,
      searchQuery,
      setSearchQuery,
      toast,
      showToast,
    }),
    [
      page, navigate, cart, cartTotal, addToCart, removeFromCart, clearCart,
      checkout, enrollInCourse, enrollments, isEnrolledMap, searchQuery, toast, showToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
