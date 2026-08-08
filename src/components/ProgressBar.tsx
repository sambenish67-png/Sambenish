import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useCountUpOnView } from '@/hooks/useCountUpOnView';
import { mutedText } from '@/utils/styles';

interface ProgressBarProps {
  percentage: number;
  color?: string;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  color = 'from-cyan-400 to-purple-500',
  animated = true,
}) => {
  const { isDark } = useTheme();
  const [displayPercentage, ref] = useCountUpOnView<HTMLDivElement>(percentage, { animated });

  return (
    <div ref={ref} className="w-full">
      <div
        className={`h-2 rounded-full overflow-hidden ${
          isDark ? 'bg-slate-700' : 'bg-slate-300'
        }`}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${displayPercentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      <div className="text-right text-sm font-semibold mt-1">
        {Math.round(displayPercentage)}%
      </div>
    </div>
  );
};

interface CircularProgressProps {
  percentage: number;
  size?: number;
  color?: string;
  label?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  color = 'url(#gradient)',
  label,
}) => {
  const { isDark } = useTheme();
  const [displayPercentage, ref] = useCountUpOnView<SVGSVGElement>(percentage);

  const circumference = 2 * Math.PI * (size / 2 - 5);
  const offset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        ref={ref}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#f093fb" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 5}
          fill="none"
          stroke={isDark ? '#334155' : '#cbd5e1'}
          strokeWidth="4"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 5}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <text
          x={size / 2}
          y={size / 2 + 5}
          textAnchor="middle"
          className="text-lg font-bold fill-current"
          style={{ transform: 'rotate(90deg)', transformOrigin: `${size / 2}px ${size / 2}px` }}
        >
          {Math.round(displayPercentage)}%
        </text>
      </svg>
      {label && (
        <p className={`text-sm font-medium ${mutedText(isDark)}`}>
          {label}
        </p>
      )}
    </div>
  );
};

export { ProgressBar, CircularProgress };
export default ProgressBar;
