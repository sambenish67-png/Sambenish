import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { revealDown, revealFade } from '@/utils/motion';
import { gradientHeading, mutedText } from '@/utils/styles';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  align = 'center',
}) => {
  const { isDark } = useTheme();

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div {...revealDown()} className={`mb-12 ${alignClass[align]}`}>
      {subtitle && (
        <motion.span
          {...revealFade({ delay: 0.1 })}
          className="inline-block px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-semibold mb-4"
        >
          {subtitle}
        </motion.span>
      )}

      <motion.h2
        {...revealFade({ delay: 0.2 })}
        className={`text-4xl md:text-5xl font-bold mb-4 ${gradientHeading}`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          {...revealFade({ delay: 0.3 })}
          className={`text-lg max-w-2xl ${mutedText(isDark)} ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
