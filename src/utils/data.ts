// Portfolio data constants
export const PORTFOLIO_DATA = {
  name: 'Sam Benish',
  title: 'AI & Data Science Student | React Native Developer | Web Developer',
  tagline: 'Building Innovative Mobile Apps, Intelligent AI Solutions, and Beautiful User Experiences',
  email: 'sambenish67@gmail.com',
  phone: '+91 80567 42609',
  location: 'Coimbatore,Tamil nadu,India',
  linkedin: 'https://linkedin.com/in/sambhenish',
  github: 'https://github.com/sambhenish',
  twitter: 'https://twitter.com/sambhenish',
};

export type SocialPlatform = 'linkedin' | 'github' | 'email';

export const SOCIAL_LINKS: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: 'linkedin', label: 'LinkedIn', href: PORTFOLIO_DATA.linkedin },
  { platform: 'github', label: 'GitHub', href: PORTFOLIO_DATA.github },
  { platform: 'email', label: 'Email', href: `mailto:${PORTFOLIO_DATA.email}` },
];

export const ABOUT_DATA: {
  summary: string;
  description: string;
  objective: string;
  stats: { label: string; value: number | string }[];
} = {
  summary: 'I am Sam Benish, currently pursuing a Bachelor of Technology in Artificial Intelligence & Data Science at Adhithya Engineering College. With a strong foundation from my Diploma in Computer Science Engineering, I am passionate about leveraging technology to solve real-world problems.',
  description: 'I am passionate about Artificial Intelligence, software engineering, mobile application development, and creating visually appealing user interfaces. I enjoy solving real-world problems through technology and continuously improving my programming and design skills.',
  objective: 'My ambition is to become a Software Engineer specializing in AI-powered applications, cross-platform mobile development, and modern web technologies.',
      stats: [],
};

export const SKILLS_DATA = [
  {
    category: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'TypeScript', 'Tailwind CSS'],
    proficiency: 90,
    icon: '🎨',
  },
  // {
  //   category: 'Mobile Development',
  //   skills: ['React Native', 'Expo', 'Mobile UI/UX'],
  //   proficiency: 85,
  //   icon: '📱',
  // },
  {
    category: 'Backend',
    skills: ['Firebase', 'REST APIs', 'Database Design'],
    proficiency: 75,
    icon: '⚙️',
  },
  {
    category: 'Programming Languages',
    skills: ['Python', 'Java', 'C Programming', 'JavaScript'],
    proficiency: 80,
    icon: '💻',
  },
  {
    category: 'Developer Tools',
    skills: ['GitHub', 'VS Code', 'Firebase Console', 'Expo CLI'],
    proficiency: 88,
    icon: '🛠️',
  },
  {
    category: 'AI & Data Science',
    skills: ['Machine Learning', 'Data Analysis', 'Python', 'TensorFlow'],
    proficiency: 70,
    icon: '🤖',
  },
];

export const EDUCATION_DATA = [
  {
    id: 1,
    institution: 'Sankara Polytechnic College',
    degree: 'Diploma',
    field: 'Computer Science Engineering',
    period: '2023 - 2026',
    grade: 'CGPA: 8.5/10',
    description: 'Completed diploma in CSE with strong fundamentals in programming, web development, and software engineering.',
  },
  {
    id: 2,
    institution: 'Adhithya Engineering College',
    degree: 'Bachelor of Technology',
    field: 'Artificial Intelligence & Data Science',
    period: '2026 - 2029',
    description: 'Currently pursuing B.Tech in AI & Data Science, focusing on machine learning, deep learning, and AI applications.',
  },
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Aurora Calm',
    category: 'AI-Powered Meditation & Wellness',
    description:
      'Aurora Calm is a modern cross-platform mobile app designed to improve mental wellness through guided meditation, breathing exercises, sleep stories, mood tracking, and AI-powered recommendations.',
    role:
      'Designed and developed the complete application, including UI/UX design, frontend development, Firebase integration, authentication, and app architecture.',
    status: 'Completed',
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase Storage',
      'React Navigation',
      'Expo AV',
      'Reanimated',
      'Lottie',
    ],
    image:
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80',
    github: 'https://github.com/sambhenish/aurora-calm',
    live: 'https://auroracalm.example.com',
    caseStudy: '#',
    features: [
      'Secure authentication and user profiles',
      'Guided meditation and breathing exercises',
      'Relaxing soundscapes and sleep stories',
      'AI-powered personalized wellness recommendations',
      'Mood tracking and daily meditation streaks',
    ],
    stats: [
      { label: 'Screens', value: '24+' },
      { label: 'Interactions', value: '10+ core flows' },
      { label: 'Launch', value: 'Completed' },
      { label: 'Users', value: 'Early access ready' },
    ],
  },
];

export const INTERESTS_DATA = [
  {
    id: 1,
    title: 'Artificial Intelligence',
    icon: '🤖',
    description: 'Exploring AI models, neural networks, and intelligent systems.',
  },
  {
    id: 2,
    title: 'Machine Learning',
    icon: '📊',
    description: 'Building predictive models and data-driven solutions.',
  },
  {
    id: 3,
    title: 'Mobile Development',
    icon: '📱',
    description: 'Creating cross-platform mobile experiences.',
  },
  {
    id: 4,
    title: 'UI/UX Design',
    icon: '🎨',
    description: 'Crafting beautiful and intuitive user interfaces.',
  },
  {
    id: 5,
    title: 'Glassmorphism',
    icon: '✨',
    description: 'Modern design aesthetic with blur and transparency effects.',
  },
  {
    id: 6,
    title: 'Data Structures',
    icon: '🔗',
    description: 'Optimizing algorithms and data organization.',
  },
];
