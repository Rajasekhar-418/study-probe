import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Clock, PlayCircle, CheckCircle2, TrendingUp,
  Award, BookOpen, Loader2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { api } from '@/services/api';
import { INSTRUCTORS } from '@/data/mockData';
import Rating from '@/components/Rating';

export default function DashboardPage() {
  const { navigate, enrollments, isEnrolledMap } = useApp();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    api.getEnrolledCourses().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  const enrollmentsToShow = data.length > 0 ? data : enrollments;

  const stats = {
    total: enrollmentsToShow.length,
    completed: enrollmentsToShow.filter((e) => e.progress === 100).length,
    inProgress: enrollmentsToShow.filter((e) => e.progress > 0 && e.progress < 100).length,
    avgProgress: enrollmentsToShow.length > 0
      ? Math.round(enrollmentsToShow.reduce((s, e) => s + e.progress, 0) / enrollmentsToShow.length)
      : 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center">
          <LayoutDashboard size={24} className="text-primary-600" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900">My Dashboard</h1>
          <p className="text-sm text-gray-500">Track your learning progress and achievements</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Enrolled Courses', value: stats.total, icon: BookOpen, bg: 'bg-primary-100', text: 'text-primary-600' },
          { label: 'Completed', value: stats.completed, icon: Award, bg: 'bg-success-100', text: 'text-success-600' },
          { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, bg: 'bg-accent-100', text: 'text-accent-600' },
          { label: 'Avg Progress', value: `${stats.avgProgress}%`, icon: Clock, bg: 'bg-primary-100', text: 'text-primary-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.bg}`}>
              <stat.icon size={20} className={stat.text} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Enrolled courses */}
      {enrollmentsToShow.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="font-display font-bold text-lg text-gray-900 mb-2">No courses yet</h3>
          <p className="text-sm text-gray-500 mb-6">Browse our catalog and start your learning journey today.</p>
          <button
            onClick={() => navigate('home')}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="font-display font-bold text-xl text-gray-900">Your Courses</h2>
          {enrollmentsToShow.map((enrollment) => {
            const course = enrollment.course;
            if (!course) return null;
            const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId);
            const isComplete = enrollment.progress === 100;

            return (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div
                    className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 cursor-pointer group"
                    onClick={() => navigate('course-detail', { courseId: course.id })}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <PlayCircle size={36} className="text-white opacity-90 drop-shadow-lg" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-display font-bold text-base md:text-lg text-gray-900 cursor-pointer hover:text-primary-600 transition-colors line-clamp-2"
                        onClick={() => navigate('course-detail', { courseId: course.id })}
                      >
                        {course.title}
                      </h3>
                      {isComplete && (
                        <span className="shrink-0 flex items-center gap-1 bg-success-100 text-success-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                          <CheckCircle2 size={12} /> Completed
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">by {instructor?.name}</p>
                    <Rating rating={course.rating} reviewCount={course.reviewCount} />

                    {/* Progress bar */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-gray-700">
                          {enrollment.completedLessons} / {enrollment.totalLessons} lessons
                        </span>
                        <span className="font-semibold text-primary-600">{enrollment.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isComplete ? 'bg-success-500' : 'bg-primary-600'
                          }`}
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> Last accessed {enrollment.lastAccessed}
                      </span>
                    </div>
                  </div>

                  <div className="md:self-center shrink-0">
                    <button
                      onClick={() => navigate('course-detail', { courseId: course.id })}
                      className={`w-full md:w-auto font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors ${
                        isComplete
                          ? 'bg-success-100 text-success-700 hover:bg-success-200'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {isComplete ? 'Review Course' : 'Continue Learning'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
