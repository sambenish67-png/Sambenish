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
