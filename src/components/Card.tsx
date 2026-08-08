import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { revealUp } from '@/utils/motion';
import { cardSurface } from '@/utils/styles';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true, delay = 0 }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      {...revealUp({ delay, duration: 0.5 })}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        relative rounded-2xl backdrop-blur-md transition-all duration-300
        ${cardSurface(isDark)} hover:border-cyan-400/50
        ${hover ? 'hover:shadow-neon' : ''}
        ${className}
      `}
    >
      {/* Gradient border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-20 transition-opacity bg-gradient-aurora blur-xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface GlassCardProps extends CardProps {
  gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  gradient = false,
  delay = 0,
}) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      {...revealUp({ delay, duration: 0.5 })}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`
        relative rounded-xl overflow-hidden backdrop-blur-2xl
        ${
          isDark
            ? 'bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-600/30'
            : 'bg-gradient-to-br from-white/30 to-white/10 border border-white/30'
        }
        hover:shadow-neon transition-all duration-300
        ${gradient ? 'bg-gradient-aurora/10' : ''}
        ${className}
      `}
    >
      {/* Animated glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-aurora blur-2xl" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;
