import { CATEGORIES } from '@/data/mockData';

const CATEGORY_ICONS = {
  Coffee: '☕', Leaf: '🍃', Monitor: '🖥️', Server: '🗄️',
  Database: '🗄️', GitBranch: '🌿', Smartphone: '📱', BarChart3: '📊',
};

export default function CategoryPills({ activeCategory, onSelect }) {
  const pills = [{ id: 'all', name: 'All Courses', icon: null }, ...CATEGORIES];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
      {pills.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              isActive
                ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            {cat.icon && <span>{CATEGORY_ICONS[cat.icon]}</span>}
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
