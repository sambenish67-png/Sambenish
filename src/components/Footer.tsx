import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { PORTFOLIO_DATA } from '@/utils/data';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: PORTFOLIO_DATA.linkedin, label: 'LinkedIn' },
    { icon: Github, href: PORTFOLIO_DATA.github, label: 'GitHub' },
    { icon: Mail, href: `mailto:${PORTFOLIO_DATA.email}`, label: 'Email' },
  ];

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-gradient-aurora bg-clip-text text-transparent mb-2">
              Sam Benish
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Building innovative digital experiences with passion and creativity.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`text-sm transition-colors hover:text-cyan-400 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Follow Me
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all hover:scale-110 hover:shadow-neon ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p
            className={`text-sm flex items-center gap-2 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Made with <Heart size={16} className="text-red-500" /> © {currentYear} Sam Benish
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
