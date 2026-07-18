import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Zap, Terminal, Sparkles } from 'lucide-react';

const iconSet = [Cpu, Layers, Zap, Terminal, Sparkles];

const AuroraBackground: React.FC = () => {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(17,24,39,0.98))]" />

      <motion.div
        className="absolute left-[-8%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.35),transparent_55%)] blur-3xl"
        animate={{ x: ['0%', '8%', '-4%', '0%'], y: ['0%', '6%', '-4%', '0%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute right-[-10%] top-[20%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_55%)] blur-3xl"
        animate={{ x: ['0%', '-6%', '5%', '0%'], y: ['0%', '-4%', '3%', '0%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-[15%] bottom-[5%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.18),transparent_55%)] blur-3xl"
        animate={{ x: ['0%', '5%', '-3%', '0%'], y: ['0%', '4%', '-5%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 opacity-20 bg-grid-pattern" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen bg-noise" />

      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path d="M20 120 C 220 180 420 20 620 90 S 1120 190 1180 90" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" />
        <path d="M120 680 C 280 560 520 760 740 640 S 1040 420 1160 520" fill="none" stroke="url(#lineGradient)" strokeWidth="1" />
        <path d="M0 420 L 260 300 L 520 480 L 760 340 L 1040 420 L 1200 320" fill="none" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.6" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {iconSet.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute flex items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 shadow-[0_0_35px_rgba(124,58,237,0.12)]"
            style={{
              width: 52,
              height: 52,
              left: `${10 + index * 16}%`,
              top: `${12 + (index % 2) * 18}%`,
            }}
            animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 10 + index * 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={20} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute pointer-events-none h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28),rgba(124,58,237,0.08),transparent_70%)] blur-3xl"
        animate={{ opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ left: `${cursor.x}%`, top: `${cursor.y}%`, translate: '-50% -50%' }}
      />

      <motion.div
        className="absolute pointer-events-none h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.14),transparent_65%)] blur-3xl"
        animate={{ x: [0, 18, -15, 0], y: [0, -10, 12, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default AuroraBackground;
