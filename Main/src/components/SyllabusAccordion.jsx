import { useState } from 'react';
import { ChevronDown, PlayCircle, Lock } from 'lucide-react';

export default function SyllabusAccordion({ syllabus, isEnrolled }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

  const totalLessons = syllabus.reduce((sum, sec) => sum + sec.lessons.length, 0);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-display font-bold text-lg text-gray-900">Course Content</h3>
        <span className="text-sm text-gray-500">
          {syllabus.length} sections · {totalLessons} lectures
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {syllabus.map((section, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="font-semibold text-sm text-gray-900 truncate">
                    {section.title}
                  </span>
                </div>
                <span className="text-xs text-gray-500 shrink-0 ml-3">
                  {section.lessons.length} lectures
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 animate-slide-down">
                  <ul className="space-y-1 ml-8">
                    {section.lessons.map((lesson, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {isEnrolled ? (
                          <PlayCircle size={16} className="text-primary-500 shrink-0" />
                        ) : (
                          <Lock size={14} className="text-gray-400 shrink-0" />
                        )}
                        <span className="text-sm text-gray-600">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
