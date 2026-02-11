import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  HelpCircle,
  BarChart3,
  Menu,
  X,
  Flag,
  Wrench,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/topics', label: 'Topics', icon: BookOpen },
  { path: '/quiz', label: 'Quiz', icon: HelpCircle },
  { path: '/simulator', label: 'Build Sim', icon: Wrench },
  { path: '/flagged', label: 'Flagged', icon: Flag },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getOverallStats } = useProgress();
  const stats = getOverallStats();

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-600">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={import.meta.env.BASE_URL + 'logo.gif'} alt="VistaFly Logo" className="w-14 h-14 rounded-lg" />
            <div>
              <h1 className="font-display font-bold text-lg text-white group-hover:text-neon-cyan transition-colors">
                VistaFly Academy
              </h1>
              <p className="text-xs text-white/50 font-body">Drone Training Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    font-body font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-neon-cyan/20 text-neon-cyan'
                      : 'text-white/70 hover:text-white hover:bg-dark-700'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Streak Badge (Desktop) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-700 border border-dark-500">
            <span className="text-lg">🔥</span>
            <span className="font-body font-semibold text-neon-orange">
              {stats.studyStreak} day streak
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-b border-dark-600"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      font-body font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-neon-cyan/20 text-neon-cyan'
                        : 'text-white/70 hover:text-white hover:bg-dark-700'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              {/* Streak Badge (Mobile) */}
              <div className="flex items-center gap-2 px-4 py-3 mt-4 rounded-lg bg-dark-700 border border-dark-500">
                <span className="text-lg">🔥</span>
                <span className="font-body font-semibold text-neon-orange">
                  {stats.studyStreak} day streak
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
