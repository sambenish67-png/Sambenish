import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Button from '../Button';
import { Download, MessageCircle, Zap } from 'lucide-react';
import { scrollToElement } from '@/utils/types';

const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (clientX - left) / width,
      y: (clientY - top) / height,
    });
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-96 h-96 bg-gradient-aurora rounded-full blur-3xl animate-float opacity-20" />
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-aurora rounded-full blur-3xl animate-float animation-delay-2000 opacity-20" />
        </div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Profile Image with Glow */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              {/* Glowing border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-aurora opacity-75 blur-2xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Profile image */}
              <motion.div
                className={`relative inset-0 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br from-cyan-400 to-purple-600 p-1 flex items-center justify-center ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                }`}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-5xl md:text-6xl">
                  👨‍💻
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Heading with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-white">Hey, I'm</span>
              <span className="block bg-gradient-aurora bg-clip-text text-transparent">
                Sam Benish
              </span>
            </h1>
          </motion.div>

          {/* Subtitle with typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className={`text-2xl md:text-3xl font-semibold ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              AI & Data Science Student | Diploma Graduate in Computer Science Engineering (CSE)
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`text-lg md:text-xl max-w-2xl mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Building innovative mobile apps, intelligent AI solutions, and beautiful user experiences with passion and creativity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="gap-2"
              onClick={() => scrollToElement('contact')}
            >
              <MessageCircle size={20} />
              Contact Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => scrollToElement('projects')}
            >
              <Zap size={20} />
              View Projects
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="gap-2"
            >
              <Download size={20} />
              Resume
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="pt-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'} mb-2`}>
              Scroll to explore
            </p>
            <div className={`w-6 h-10 border-2 rounded-full mx-auto p-2 ${
              isDark ? 'border-slate-500' : 'border-slate-400'
            }`}>
              <motion.div
                className={`w-1 h-2 rounded-full mx-auto ${
                  isDark ? 'bg-slate-500' : 'bg-slate-400'
                }`}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
