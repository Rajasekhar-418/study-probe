import { useState, useEffect } from 'react';
import {
  ArrowLeft, PlayCircle, Clock, BarChart3, BookOpen, Users,
  CheckCircle2, ShoppingCart, Heart, Share2, Globe, Award, Check,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { api } from '@/services/api';
import { INSTRUCTORS } from '@/data/mockData';
import Rating from '@/components/Rating';
import SyllabusAccordion from '@/components/SyllabusAccordion';
import CourseCard from '@/components/CourseCard';

export default function CourseDetailPage() {
  const { page, navigate, addToCart, enrollInCourse, isEnrolledMap, cart } = useApp();
  const courseId = page.params.courseId;
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getCourseById(courseId).then((data) => {
      setCourse(data);
      if (data) {
        api.getCoursesByCategory(data.categoryId).then((related) => {
          setRelatedCourses(related.filter((c) => c.id !== data.id).slice(0, 4));
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
        <button
          onClick={() => navigate('home')}
          className="text-primary-600 font-semibold hover:underline"
        >
          Back to home
        </button>
      </div>
    );
  }

  const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId);
  const isEnrolled = isEnrolledMap[course.id];
  const inCart = cart.some((c) => c.id === course.id);
  const discountPercent = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-gray-900 to-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-10">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to courses
          </button>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {course.level}
                </span>
                {course.bestseller && (
                  <span className="bg-accent-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl leading-tight text-balance">
                {course.title}
              </h1>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {course.subtitle}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Rating rating={course.rating} reviewCount={course.reviewCount} size="lg" />
                <span className="text-sm text-gray-300 flex items-center gap-1">
                  <Users size={15} /> {course.studentCount.toLocaleString()} students
                </span>
              </div>

              <p className="text-sm text-gray-300">
                Created by <span className="text-primary-400 font-medium">{instructor?.name}</span>
              </p>

              <div className="flex items-center gap-5 text-sm text-gray-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock size={16} /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={16} /> {course.lectureCount} lectures
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe size={16} /> English
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: description, syllabus, instructor */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-success-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Syllabus */}
            <div>
              <SyllabusAccordion syllabus={course.syllabus} isEnrolled={isEnrolled} />
            </div>

            {/* Instructor bio */}
            {instructor && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-display font-bold text-xl text-gray-900 mb-4">Your Instructor</h2>
                <div className="flex flex-col sm:flex-row gap-5">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-lg text-gray-900">{instructor.name}</h3>
                    <p className="text-sm text-primary-600 font-medium">{instructor.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Rating rating={instructor.rating} /> Instructor Rating
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} /> {instructor.students.toLocaleString()} students
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} /> {instructor.courses} courses
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pt-1">{instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: purchase card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <PlayCircle size={36} className="text-primary-600" />
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                    <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                    <span className="text-sm font-semibold text-error-600">{discountPercent}% off</span>
                  </div>

                  {isEnrolled ? (
                    <button
                      onClick={() => navigate('dashboard')}
                      className="w-full bg-success-500 hover:bg-success-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Check size={18} /> Go to Course
                    </button>
                  ) : inCart ? (
                    <button
                      onClick={() => navigate('cart')}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      View in Cart
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => addToCart(course)}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                      <button
                        onClick={() => enrollInCourse(course)}
                        className="w-full bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 rounded-xl transition-colors"
                      >
                        Buy Now
                      </button>
                    </>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 py-2 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                      <Heart size={16} /> Wishlist
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 py-2 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                      <Share2 size={16} /> Share
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-400 pt-1">30-day money-back guarantee</p>

                  <div className="border-t border-gray-100 pt-4 space-y-2.5">
                    <h4 className="font-semibold text-sm text-gray-900">This course includes:</h4>
                    {[
                      { icon: PlayCircle, text: `${course.duration} on-demand video` },
                      { icon: BookOpen, text: `${course.lectureCount} lectures` },
                      { icon: Award, text: 'Certificate of completion' },
                      { icon: Globe, text: 'Full lifetime access' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <item.icon size={16} className="text-gray-400" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedCourses.map((rc) => (
                <CourseCard
                  key={rc.id}
                  course={rc}
                  instructor={INSTRUCTORS.find((i) => i.id === rc.instructorId)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
