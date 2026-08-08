import React, { createContext, useContext, useEffect, useState } from 'react';
import { readStoredValue, writeStoredValue } from '@/utils/storage';

export const THEME_MODES = [
  'dark',
  'light',
  'cyberpunk',
  'ocean',
  'sunset',
  'forest',
  'minimal',
  'aurora',
  'neural',
  'glass',
] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

const THEME_STORAGE_KEY = 'themeMode';

const isThemeMode = (value: string | null): value is ThemeMode =>
  value !== null && (THEME_MODES as readonly string[]).includes(value);

const prefersDarkColorScheme = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true;

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    console.warn('Unable to read the preferred color scheme:', error);
    return true;
  }
};

interface ThemeContextType {
  isDark: boolean;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = readStoredValue(THEME_STORAGE_KEY);
    if (isThemeMode(saved)) return saved;
    if (saved !== null) {
      console.warn(`Ignoring unknown persisted theme "${saved}".`);
    }
    return prefersDarkColorScheme() ? 'dark' : 'light';
  });

  const isDark =
    themeMode === 'dark' || themeMode === 'cyberpunk' || themeMode === 'forest' || themeMode === 'aurora' || themeMode === 'neural';

  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    
    // Apply theme-specific styles
    switch (themeMode) {
      case 'dark':
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#0f172a');
        root.style.setProperty('--bg-secondary', '#1e293b');
        root.style.setProperty('--text-color', '#f8fafc');
        break;
      case 'light':
        root.classList.remove('dark');
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--text-color', '#0f172a');
        break;
      case 'cyberpunk':
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#0a0e27');
        root.style.setProperty('--bg-secondary', '#1a1f3a');
        root.style.setProperty('--accent-glow', 'blur(60px)');
        root.style.setProperty('--text-color', '#e6f2ff');
        break;
      case 'ocean':
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#0a1930');
        root.style.setProperty('--bg-secondary', '#122a4a');
        root.style.setProperty('--text-color', '#e6f8ff');
        break;
      case 'sunset':
        root.classList.remove('dark');
        root.style.setProperty('--bg-primary', '#fff7ed');
        root.style.setProperty('--bg-secondary', '#fed7aa');
        root.style.setProperty('--text-color', '#2b2b2b');
        break;
      case 'forest':
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#0f2818');
        root.style.setProperty('--bg-secondary', '#1a4d2e');
        root.style.setProperty('--text-color', '#e6fff0');
        break;
      case 'minimal':
        root.classList.remove('dark');
        root.style.setProperty('--bg-primary', '#fafafa');
        root.style.setProperty('--bg-secondary', '#f5f5f5');
        root.style.setProperty('--text-color', '#0b1220');
        break;
      case 'aurora':
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#071127');
        root.style.setProperty('--bg-secondary', '#0b1626');
        root.style.setProperty('--accent-1', '#7c3aed');
        root.style.setProperty('--accent-2', '#06b6d4');
        root.style.setProperty('--gradient-aurora', 'radial-gradient(ellipse at 10% 20%, rgba(124,58,237,0.18), transparent 10%), radial-gradient(ellipse at 90% 80%, rgba(6,182,212,0.12), transparent 12%)');
        root.style.setProperty('--text-color', '#dff6ff');
        break;
      case 'neural':
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#020617');
        root.style.setProperty('--bg-secondary', '#07102a');
        root.style.setProperty('--accent-1', '#00e6ff');
        root.style.setProperty('--accent-2', '#b388ff');
        root.style.setProperty('--neural-grid', 'repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px)');
        root.style.setProperty('--text-color', '#dffcff');
        break;
      case 'glass':
        root.classList.remove('dark');
        root.style.setProperty('--bg-primary', 'rgba(255,255,255,0.6)');
        root.style.setProperty('--bg-secondary', 'rgba(255,255,255,0.85)');
        root.style.setProperty('--accent-1', '#8b5cf6');
        root.style.setProperty('--accent-2', '#06b6d4');
        root.style.setProperty('--glass-opacity', '0.6');
        root.style.setProperty('--text-color', '#071127');
        break;
    }
    
    writeStoredValue(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((current) => {
      const currentIndex = THEME_MODES.indexOf(current);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % THEME_MODES.length;
      return THEME_MODES[nextIndex] as ThemeMode;
    });
  };

  const setTheme = (theme: ThemeMode) => {
    if (!isThemeMode(theme)) {
      throw new Error(`Unsupported theme "${theme}". Expected one of: ${THEME_MODES.join(', ')}.`);
    }
    setThemeMode(theme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, themeMode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
