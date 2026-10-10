import { useState, useRef, useEffect } from 'react';
import {
  Search, ShoppingCart, LayoutDashboard, Menu, X, ChevronDown,
  Code2, GraduationCap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';

const CATEGORY_ICONS = {
  Coffee: '☕', Leaf: '🍃', Monitor: '🖥️', Server: '🗄️',
  Database: '🗄️', GitBranch: '🌿', Smartphone: '📱', BarChart3: '📊',
};

export default function Navbar() {
  const { navigate, page, cart, searchQuery, setSearchQuery } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const catRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    setMobileOpen(false);
    if (page.name !== 'home') {
      navigate('home');
    }
    setTimeout(() => {
      const grid = document.getElementById('course-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const isActive = (name) => page.name === name;

  return (
    <>
      <div className="h-16">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-2 lg:gap-4">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="font-display font-extrabold text-lg text-gray-900 hidden sm:block">
                Code<span className="text-primary-600">Mastery</span>
              </span>
            </button>

            {/* Categories dropdown */}
            <div ref={catRef} className="relative hidden lg:block">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Categories <ChevronDown size={16} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-slide-down">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCatOpen(false);
                        navigate('home', { categoryId: cat.id });
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors flex items-center gap-3"
                    >
                      <span className="text-base">{CATEGORY_ICONS[cat.icon] || '📂'}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search bar - desktop */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* Search icon - mobile */}
            <div ref={searchRef} className="flex-1 md:hidden">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Search size={20} />
              </button>
              {searchOpen && (
                <form onSubmit={handleSearch} className="absolute top-full left-0 right-0 mt-1 px-4 animate-slide-down">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for courses..."
                      autoFocus
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm outline-none focus:border-primary-400"
                    />
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </form>
              )}
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-1 shrink-0">
              <button
                onClick={() => navigate('dashboard')}
                className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive('dashboard') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button
                onClick={() => navigate('instructor-studio')}
                className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive('instructor-studio') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <GraduationCap size={16} /> Teach
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={() => navigate('cart')}
              className={`relative p-2 rounded-lg transition-colors shrink-0 ${
                isActive('cart') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-lg shrink-0"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-slide-down">
              <div className="px-4 py-3 space-y-1">
                <button
                  onClick={() => { navigate('dashboard'); setMobileOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LayoutDashboard size={18} /> My Dashboard
                </button>
                <button
                  onClick={() => { navigate('instructor-studio'); setMobileOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <GraduationCap size={18} /> Instructor Studio
                </button>
                <div className="pt-2 border-t border-gray-100">
                  <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Categories</p>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { navigate('home', { categoryId: cat.id }); setMobileOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      <span>{CATEGORY_ICONS[cat.icon] || '📂'}</span> {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
