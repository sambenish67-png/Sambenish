import React from 'react';
import { useTheme, type ThemeMode } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { themeMode, setTheme } = useTheme();

  const themes: { mode: ThemeMode; label: string; color: string }[] = [
    { mode: 'dark', label: 'Dark', color: 'from-slate-700 to-slate-900' },
    { mode: 'light', label: 'Light', color: 'from-slate-100 to-slate-200' },
    { mode: 'cyberpunk', label: 'Cyberpunk', color: 'from-purple-600 to-pink-600' },
    { mode: 'ocean', label: 'Ocean', color: 'from-blue-400 to-cyan-600' },
    { mode: 'sunset', label: 'Sunset', color: 'from-orange-400 to-rose-500' },
    { mode: 'forest', label: 'Forest', color: 'from-green-600 to-emerald-700' },
    { mode: 'minimal', label: 'Minimal', color: 'from-gray-300 to-gray-400' },
    { mode: 'aurora', label: 'Aurora', color: 'from-violet-500 to-cyan-400' },
    { mode: 'neural', label: 'Neural', color: 'from-cyan-300 to-violet-400' },
    { mode: 'glass', label: 'Glass', color: 'from-white to-slate-100' },
  ];

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg backdrop-blur-md border border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Palette size={20} className="text-slate-700 dark:text-slate-300" />
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              🎨
            </button>

            {/* Theme Menu */}
            <motion.div
              className="absolute bottom-full right-0 mb-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-2 hidden group-hover:block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
            >
              <div className="flex flex-col gap-1">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.mode}
                    onClick={() => setTheme(theme.mode)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 whitespace-nowrap ${
                      themeMode === theme.mode
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.color}`} />
                    {theme.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSwitcher;
