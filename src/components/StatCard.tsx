import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useCountUpOnView } from '@/hooks/useCountUpOnView';
import { revealScale } from '@/utils/motion';
import { cardSurface, gradientHeading, mutedText } from '@/utils/styles';

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
  const [count, ref] = useCountUpOnView<HTMLSpanElement>(value, {
    steps: duration * 60,
    intervalMs: 16,
  });

  return (
    <span ref={ref}>
      {prefix}
      {Math.floor(count).toLocaleString()}
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
      {...revealScale({ delay })}
      className={`
        relative rounded-2xl backdrop-blur-md p-6 text-center
        ${cardSurface(isDark)}
        hover:shadow-neon transition-all duration-300
      `}
    >
      {icon && (
        <div className="text-4xl mb-4 flex justify-center">{icon}</div>
      )}

      <div className={`text-3xl md:text-4xl font-bold mb-2 ${gradientHeading}`}>
        {isNumeric ? (
          <AnimatedCounter value={value as number} suffix={suffix} />
        ) : (
          value
        )}
      </div>
      <p className={`text-sm font-medium ${mutedText(isDark)}`}>
        {label}
      </p>
    </motion.div>
  );
};

export { AnimatedCounter, StatCard };
export default StatCard;
