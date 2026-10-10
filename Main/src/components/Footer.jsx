import { Code2, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                Code<span className="text-primary-400">Mastery</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Master Java, Spring Boot & full-stack development with courses built by industry experts.
            </p>
            <div className="flex gap-3 mt-4">
              {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon size={16} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wide">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate('home', { categoryId: cat.id })}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wide">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: 'My Dashboard', action: () => navigate('dashboard') },
                { label: 'Instructor Studio', action: () => navigate('instructor-studio') },
                { label: 'Cart', action: () => navigate('cart') },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 CodeMastery. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
