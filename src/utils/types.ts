// Type definitions
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  features: string[];
}

export interface Skill {
  category: string;
  skills: string[];
  proficiency: number;
  icon: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  description: string;
}

export interface Interest {
  id: number;
  title: string;
  icon: string;
  description: string;
}

// Animation utilities
export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

// Scroll utilities
export const scrollToElement = (elementId: string): boolean =>
  scrollToSelector(`#${elementId}`);

export const scrollToSelector = (selector: string): boolean => {
  let element: Element | null;

  try {
    element = document.querySelector(selector);
  } catch (error) {
    console.error(`Invalid scroll target selector "${selector}":`, error);
    return false;
  }

  if (!element) {
    console.warn(`Scroll target "${selector}" was not found in the document.`);
    return false;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
};

// Data utility functions
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date);
};

export const getYearsSince = (date: Date): number => {
  return Math.floor((new Date().getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
};
