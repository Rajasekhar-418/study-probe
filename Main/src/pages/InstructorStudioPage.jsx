import { useState } from 'react';
import {
  GraduationCap, Upload, Plus, Trash2, Loader2, CheckCircle2,
  DollarSign, BookOpen, Layers, Eye, ArrowLeft,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { api } from '@/services/api';
import { CATEGORIES } from '@/data/mockData';

const CATEGORY_ICONS = {
  Coffee: '☕', Leaf: '🍃', Monitor: '🖥️', Server: '🗄️',
  Database: '🗄️', GitBranch: '🌿', Smartphone: '📱', BarChart3: '📊',
};

const THUMBNAIL_OPTIONS = [
  'https://images.pexels.com/photos/5125366/pexels-photo-5125366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34803986/pexels-photo-34803986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17489151/pexels-photo-17489151.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

export default function InstructorStudioPage() {
  const { navigate, showToast } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    categoryId: CATEGORIES[0].id,
    level: LEVELS[3],
    price: '',
    description: '',
    thumbnail: THUMBNAIL_OPTIONS[0],
    highlights: ['', '', '', ''],
    syllabus: [{ title: '', lessons: [''] }],
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const updateHighlight = (i, value) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h, idx) => (idx === i ? value : h)),
    }));
  };

  const updateSyllabusSection = (si, value) => {
    setForm((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((s, idx) => (idx === si ? { ...s, title: value } : s)),
    }));
  };

  const updateLesson = (si, li, value) => {
    setForm((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((s, idx) =>
        idx === si
          ? { ...s, lessons: s.lessons.map((l, lidx) => (lidx === li ? value : l)) }
          : s
      ),
    }));
  };

  const addLesson = (si) => {
    setForm((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((s, idx) =>
        idx === si ? { ...s, lessons: [...s.lessons, ''] } : s
      ),
    }));
  };

  const removeLesson = (si, li) => {
    setForm((prev) => ({
      ...prev,
      syllabus: prev.syllabus.map((s, idx) =>
        idx === si ? { ...s, lessons: s.lessons.filter((_, lidx) => lidx !== li) } : s
      ),
    }));
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      syllabus: [...prev.syllabus, { title: '', lessons: [''] }],
    }));
  };

  const removeSection = (si) => {
    setForm((prev) => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, idx) => idx !== si),
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.subtitle.trim()) e.subtitle = 'Subtitle is required';
    if (!form.description.trim() || form.description.length < 50)
      e.description = 'Description must be at least 50 characters';
    if (!form.price || parseFloat(form.price) <= 0) e.price = 'Enter a valid price';
    const validHighlights = form.highlights.filter((h) => h.trim());
    if (validHighlights.length < 3) e.highlights = 'Add at least 3 learning outcomes';
    const validSections = form.syllabus.filter((s) => s.title.trim());
    if (validSections.length < 1) e.syllabus = 'Add at least 1 syllabus section';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors before publishing', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const cleanSyllabus = form.syllabus
        .filter((s) => s.title.trim())
        .map((s) => ({
          title: s.title,
          lessons: s.lessons.filter((l) => l.trim()),
        }));

      await api.createCourse({
        title: form.title,
        subtitle: form.subtitle,
        categoryId: form.categoryId,
        level: form.level,
        price: parseFloat(form.price),
        originalPrice: parseFloat(form.price) * 1.8,
        description: form.description,
        thumbnail: form.thumbnail,
        highlights: form.highlights.filter((h) => h.trim()),
        syllabus: cleanSyllabus,
        instructorId: 'ins-1',
        duration: '10 hours',
        lectureCount: cleanSyllabus.reduce((sum, s) => sum + s.lessons.length, 0),
      });
      setSuccess(true);
      showToast('Course published successfully!');
    } catch (err) {
      showToast('Failed to publish course. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-success-600" />
        </div>
        <h2 className="font-display font-extrabold text-2xl text-gray-900 mb-3">Course Published!</h2>
        <p className="text-gray-500 mb-8">
          Your course is now live and available for students to enroll. Great work!
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setSuccess(false);
              setForm({
                title: '', subtitle: '', categoryId: CATEGORIES[0].id, level: LEVELS[3],
                price: '', description: '', thumbnail: THUMBNAIL_OPTIONS[0],
                highlights: ['', '', '', ''], syllabus: [{ title: '', lessons: [''] }],
              });
            }}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Create Another
          </button>
          <button
            onClick={() => navigate('home')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            View Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12 animate-fade-in">
      <button
        onClick={() => navigate('home')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to home
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center">
          <GraduationCap size={24} className="text-primary-600" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900">Instructor Studio</h1>
          <p className="text-sm text-gray-500">Create and publish a new course for students worldwide</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Section icon={BookOpen} title="Basic Information">
          <Field label="Course Title" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Complete Java Masterclass"
              className={inputClass(!!errors.title)}
            />
          </Field>

          <Field label="Subtitle" error={errors.subtitle}>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => update('subtitle', e.target.value)}
              placeholder="A short, compelling one-liner about your course"
              className={inputClass(!!errors.subtitle)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={form.categoryId}
                onChange={(e) => update('categoryId', e.target.value)}
                className={inputClass(false)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Level">
              <select
                value={form.level}
                onChange={(e) => update('level', e.target.value)}
                className={inputClass(false)}
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Describe what students will learn, who this course is for, and what makes it unique..."
              rows={4}
              className={inputClass(!!errors.description)}
            />
            <p className="text-xs text-gray-400 mt-1">{form.description.length} characters</p>
          </Field>
        </Section>

        {/* Pricing */}
        <Section icon={DollarSign} title="Pricing">
          <Field label="Price (USD)" error={errors.price}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                placeholder="49.99"
                className={inputClass(!!errors.price, 'pl-8')}
              />
            </div>
          </Field>
          <p className="text-xs text-gray-500 -mt-2">
            A suggested original price of ${(parseFloat(form.price) * 1.8 || 0).toFixed(2)} will be shown for discount display.
          </p>
        </Section>

        {/* Thumbnail */}
        <Section icon={Eye} title="Course Thumbnail">
          <p className="text-sm text-gray-500 mb-3">Choose a thumbnail image for your course:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {THUMBNAIL_OPTIONS.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => update('thumbnail', url)}
                className={`relative rounded-lg overflow-hidden aspect-video border-2 transition-all ${
                  form.thumbnail === url
                    ? 'border-primary-600 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                {form.thumbnail === url && (
                  <div className="absolute inset-0 bg-primary-600/20 flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-white drop-shadow-lg" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Section>

        {/* Learning Outcomes */}
        <Section icon={CheckCircle2} title="Learning Outcomes">
          <p className="text-sm text-gray-500 mb-3">What will students achieve after completing this course?</p>
          {errors.highlights && <p className="text-sm text-error-600 mb-2">{errors.highlights}</p>}
          <div className="space-y-2">
            {form.highlights.map((h, i) => (
              <input
                key={i}
                type="text"
                value={h}
                onChange={(e) => updateHighlight(i, e.target.value)}
                placeholder={`Outcome ${i + 1}`}
                className={inputClass(false)}
              />
            ))}
          </div>
        </Section>

        {/* Syllabus */}
        <Section icon={Layers} title="Course Syllabus">
          <p className="text-sm text-gray-500 mb-3">Build your course curriculum section by section.</p>
          {errors.syllabus && <p className="text-sm text-error-600 mb-2">{errors.syllabus}</p>}
          <div className="space-y-4">
            {form.syllabus.map((section, si) => (
              <div key={si} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSyllabusSection(si, e.target.value)}
                    placeholder={`Section ${si + 1} title`}
                    className={inputClass(false, 'flex-1 font-semibold')}
                  />
                  {form.syllabus.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(si)}
                      className="p-2 text-gray-400 hover:text-error-500 hover:bg-error-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="space-y-2 ml-2">
                  {section.lessons.map((lesson, li) => (
                    <div key={li} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={lesson}
                        onChange={(e) => updateLesson(si, li, e.target.value)}
                        placeholder={`Lesson ${li + 1}`}
                        className={inputClass(false, 'flex-1 text-sm')}
                      />
                      {section.lessons.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLesson(si, li)}
                          className="p-1.5 text-gray-400 hover:text-error-500 rounded transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addLesson(si)}
                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium ml-2"
                  >
                    <Plus size={14} /> Add lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSection}
            className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 border-2 border-dashed border-primary-200 hover:border-primary-400 rounded-xl px-4 py-3 w-full mt-3 transition-colors"
          >
            <Plus size={16} /> Add Section
          </button>
        </Section>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <Upload size={18} /> Publish Course
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('home')}
            className="sm:w-40 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3.5 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-primary-600" />
        <h2 className="font-display font-bold text-lg text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-sm text-error-600">{error}</p>}
    </div>
  );
}

function inputClass(hasError, extra = '') {
  return `w-full px-4 py-2.5 text-sm bg-white border rounded-xl outline-none transition-all ${
    hasError
      ? 'border-error-300 focus:ring-2 focus:ring-error-100'
      : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
  } ${extra}`;
}
