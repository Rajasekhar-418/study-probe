import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Hero() {
  const { navigate } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-700 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgtMnYtNGgydjR6bTAtNmgtMnYtNGgydjR6bS02IDZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
              <Sparkles size={16} className="text-accent-400" />
              <span className="text-sm text-gray-200 font-medium">Learn from industry experts</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight text-balance">
              Master Java, Spring Boot & <span className="text-primary-400">Full-Stack</span> Development
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              From your first line of Java to deploying production microservices. Hands-on,
              project-based courses that take you from beginner to job-ready developer.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  const grid = document.getElementById('course-grid');
                  if (grid) grid.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-primary-900/50"
              >
                Browse Courses <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('instructor-studio')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <Play size={18} /> Become an Instructor
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div>
                <div className="text-2xl font-bold text-white">500K+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl font-bold text-white">12+</div>
                <div className="text-sm text-gray-400">Courses</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Code window mockup */}
          <div className="hidden lg:block animate-fade-in">
            <div className="relative">
              <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-error-400" />
                  <div className="w-3 h-3 rounded-full bg-accent-400" />
                  <div className="w-3 h-3 rounded-full bg-success-400" />
                  <span className="ml-2 text-xs text-gray-400">CourseService.java</span>
                </div>
                <pre className="p-5 text-sm leading-relaxed text-gray-300 font-mono overflow-x-auto">
{`@Service
public class CourseService {

    @Autowired
    private CourseRepository repo;

    public List<Course> getFeatured() {
        return repo.findByBestsellerTrue()
            .stream()
            .sorted(comparing(
                Course::getRating).reversed())
            .limit(6)
            .collect(toList());
    }

    public Course enroll(Long id, User user) {
        Course c = repo.findById(id)
            .orElseThrow();
        c.getEnrolledUsers().add(user);
        return repo.save(c);
    }
}`}
                </pre>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-success-500 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium">
                <Play size={16} fill="white" /> Learning in progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
