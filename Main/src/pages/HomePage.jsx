import { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, Loader2, Search } from 'lucide-react';
import Hero from '@/components/Hero';
import CategoryPills from '@/components/CategoryPills';
import CourseCard from '@/components/CourseCard';
import { useApp } from '@/context/AppContext';
import { api } from '@/services/api';
import { INSTRUCTORS } from '@/data/mockData';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function HomePage() {
  const { page, searchQuery, navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState(page.params.categoryId || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    if (page.params.categoryId) {
      setActiveCategory(page.params.categoryId);
    }
  }, [page.params]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.getCourses({ categoryId: activeCategory, search: searchQuery, sort: sortBy })
      .then((data) => {
        if (!cancelled) {
          setCourses(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [activeCategory, searchQuery, sortBy]);

  const instructorMap = useMemo(
    () => Object.fromEntries(INSTRUCTORS.map((i) => [i.id, i])),
    []
  );

  return (
    <div>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
          <CategoryPills activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>
      </div>

      <div id="course-grid" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'Explore Courses'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? 'Loading...' : `${courses.length} course${courses.length !== 1 ? 's' : ''} available`}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:border-gray-300 transition-colors"
            >
              <SlidersHorizontal size={16} />
              Sort: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
            </button>
            {showSort && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-20 animate-slide-down">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      sortBy === opt.value
                        ? 'text-primary-600 bg-primary-50 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="text-primary-500 animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search size={48} className="text-gray-300 mb-4" />
            <h3 className="font-display font-bold text-lg text-gray-900 mb-1">No courses found</h3>
            <p className="text-sm text-gray-500">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                instructor={instructorMap[course.instructorId]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
