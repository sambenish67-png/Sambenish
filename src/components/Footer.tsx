import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SocialLinks from './SocialLinks';
import { revealFade, revealUp } from '@/utils/motion';
import { scrollToTop } from '@/utils/scroll';
import { gradientHeading, mutedText } from '@/utils/styles';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative overflow-hidden border-t transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-aurora opacity-10 animate-spin-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div {...revealUp()}>
            <h3 className={`text-2xl font-bold mb-2 ${gradientHeading}`}>
              Sam Benish
            </h3>
            <p className={`text-sm ${mutedText(isDark)}`}>
              Building innovative digital experiences with passion and creativity.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...revealUp({ delay: 0.1 })}>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`text-sm transition-colors hover:text-cyan-400 ${mutedText(isDark)}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div {...revealUp({ delay: 0.2 })}>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Follow Me
            </h4>
            <SocialLinks iconSize={20} padding="p-2" />
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className={`h-px mb-8 ${
            isDark ? 'bg-gradient-to-r from-transparent via-slate-600 to-transparent' : 'bg-slate-300'
          }`}
        />

        {/* Bottom Footer */}
        <motion.div
          {...revealFade()}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className={`text-sm flex items-center gap-2 ${mutedText(isDark)}`}>
            Made with <Heart size={16} className="text-red-500" /> © {currentYear} Sam Benish
          </p>
          <button
            onClick={scrollToTop}
            className={`px-4 py-2 rounded-lg font-medium transition-all hover:shadow-neon ${
              isDark
                ? 'bg-gradient-aurora hover:shadow-aurora text-white'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
          >
            Back to Top
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
