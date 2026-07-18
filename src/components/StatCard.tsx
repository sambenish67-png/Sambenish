import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = value / (duration * 60);
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

interface StatCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix = '',
  icon,
  delay = 0,
}) => {
  const { isDark } = useTheme();
  const isNumeric = typeof value === 'number';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative rounded-2xl backdrop-blur-md p-6 text-center
        ${
          isDark
            ? 'bg-slate-800/50 border border-slate-700/50'
            : 'bg-white/50 border border-slate-200/50'
        }
        hover:shadow-neon transition-all duration-300
      `}
    >
      {icon && (
        <div className="text-4xl mb-4 flex justify-center">{icon}</div>
      )}

      <div className="text-3xl md:text-4xl font-bold bg-gradient-aurora bg-clip-text text-transparent mb-2">
        {isNumeric ? (
          <AnimatedCounter value={value as number} suffix={suffix} />
        ) : (
          value
        )}
      </div>
      <p
        className={`text-sm font-medium ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
};

export { AnimatedCounter, StatCard };
export default StatCard;
