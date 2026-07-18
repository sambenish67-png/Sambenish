import React from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import ProjectOverview from '@/components/sections/Projects';
import Interests from '@/components/sections/Interests';
import Contact from '@/components/sections/Contact';
import Internships from '@/components/sections/Internships';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import AuroraBackground from '@/components/AuroraBackground';
import { GlobalStyles } from '@/styles/global';

const AppContent: React.FC = () => {
  const { themeMode, isDark } = useTheme();

  const getBackgroundClass = () => {
    switch (themeMode) {
      case 'cyberpunk':
        return 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950';
      case 'ocean':
        return 'bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900';
      case 'sunset':
        return 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50';
      case 'forest':
        return 'bg-gradient-to-br from-slate-950 via-green-950 to-slate-950';
      case 'minimal':
        return 'bg-gradient-to-br from-gray-50 to-gray-100';
      case 'light':
        return 'bg-gradient-to-br from-white to-slate-50';
      case 'dark':
      default:
        return 'bg-gradient-to-br from-slate-900 to-slate-950';
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${getBackgroundClass()} ${isDark ? 'dark text-white' : 'text-slate-900'} transition-colors duration-500 min-h-screen`}
    >
      <GlobalStyles />
      <AuroraBackground />
      <Navbar />
      <main className="relative z-20">
        <Hero />
        <About />
        <Education />
        <Internships />
        <Skills />
        <ProjectOverview />
        <Interests />
        <Contact />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
