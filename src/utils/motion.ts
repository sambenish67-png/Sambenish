import type { MotionProps } from 'framer-motion';

const REVEAL_VIEWPORT = { once: true } as const;

interface RevealOptions {
  delay?: number;
  duration?: number;
  distance?: number;
}

const reveal = (
  axis: 'x' | 'y',
  sign: 1 | -1,
  { delay = 0, duration = 0.6, distance = 20 }: RevealOptions = {}
): MotionProps => ({
  initial: { opacity: 0, [axis]: sign * distance },
  whileInView: { opacity: 1, [axis]: 0 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration, delay },
});

/** Fade in while sliding up, once the element scrolls into view. */
export const revealUp = (options?: RevealOptions): MotionProps => reveal('y', 1, options);

/** Fade in while sliding down, once the element scrolls into view. */
export const revealDown = (options?: RevealOptions): MotionProps => reveal('y', -1, options);

/** Fade in while sliding in from the left, once the element scrolls into view. */
export const revealFromLeft = (options?: RevealOptions): MotionProps =>
  reveal('x', -1, { distance: 30, ...options });

/** Fade in while sliding in from the right, once the element scrolls into view. */
export const revealFromRight = (options?: RevealOptions): MotionProps =>
  reveal('x', 1, { distance: 30, ...options });

/** Plain fade in, once the element scrolls into view. */
export const revealFade = ({ delay = 0, duration = 0.6 }: RevealOptions = {}): MotionProps => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration, delay },
});

/** Fade in while scaling up, once the element scrolls into view. */
export const revealScale = ({ delay = 0, duration = 0.5 }: RevealOptions = {}): MotionProps => ({
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration, delay },
});

/** Endlessly repeating transition, used for ambient/looping animations. */
export const loop = (duration: number, delay = 0) => ({
  duration,
  repeat: Infinity,
  delay,
});

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
