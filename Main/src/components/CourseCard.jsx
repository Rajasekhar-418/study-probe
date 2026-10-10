import { Star, Users, PlayCircle, BarChart3, Check } from 'lucide-react';
import Rating from './Rating';
import { useApp } from '@/context/AppContext';

export default function CourseCard({ course, instructor }) {
  const { navigate, addToCart, isEnrolledMap } = useApp();
  const isEnrolled = isEnrolledMap[course.id];

  const handleClick = () => navigate('course-detail', { courseId: course.id });

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(course);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {course.bestseller && (
          <span className="absolute top-3 left-3 bg-accent-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            Bestseller
          </span>
        )}
        {isEnrolled && (
          <span className="absolute top-3 right-3 bg-success-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
            <Check size={12} /> Enrolled
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <PlayCircle
            size={48}
            className="text-white opacity-0 group-hover:opacity-90 transition-opacity duration-300 drop-shadow-lg"
          />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-display font-bold text-base text-gray-900 leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{course.subtitle}</p>

        <p className="text-xs text-gray-600">{instructor?.name || 'Unknown Instructor'}</p>

        <Rating rating={course.rating} reviewCount={course.reviewCount} />

        <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
          <span className="flex items-center gap-1">
            <BarChart3 size={13} /> {course.level}
          </span>
          <span className="flex items-center gap-1">
            <PlayCircle size={13} /> {course.lectureCount} lectures
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">${course.price}</span>
            <span className="text-sm text-gray-400 line-through">${course.originalPrice}</span>
          </div>
          {!isEnrolled && (
            <button
              onClick={handleAddToCart}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-1.5 rounded-md transition-colors"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
