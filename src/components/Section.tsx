import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { sectionSurface, type SectionSurface } from '@/utils/styles';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  surface?: SectionSurface;
  padding?: string;
  maxWidth?: string;
  className?: string;
  /** Absolutely positioned decoration layers rendered behind the content. */
  background?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  id,
  children,
  surface = 'default',
  padding = 'py-20',
  maxWidth = 'max-w-6xl',
  className = '',
  background,
}) => {
  const { isDark } = useTheme();

  return (
    <section
      id={id}
      className={`relative ${padding} ${sectionSurface(isDark, surface)} ${className}`}
    >
      {background}
      <div className={`relative ${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>{children}</div>
    </section>
  );
};

export default Section;
