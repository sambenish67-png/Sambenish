import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { scrollToElement } from '@/utils/scroll';
import { gradientHeading, iconButtonSurface } from '@/utils/styles';

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Education', id: 'education' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const goToSection = (id: string) => {
    scrollToElement(id);
    setIsOpen(false);
  };

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-lg transition-colors ${iconButtonSurface(isDark)}`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        isDark
          ? 'bg-slate-900/80 border-slate-700'
          : 'bg-white/80 border-slate-200'
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold ${gradientHeading}`}
          >
            SB
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => goToSection(link.id)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {link.name}
              </button>
            ))}
            {themeToggle}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {themeToggle}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              className={`p-2 rounded-lg transition-colors ${iconButtonSurface(isDark)}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden pb-4 space-y-2 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => goToSection(link.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isDark
                    ? 'hover:bg-slate-700 text-slate-300'
                    : 'hover:bg-slate-200 text-slate-700'
                }`}
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
