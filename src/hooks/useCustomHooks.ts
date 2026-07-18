import { useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

export const useScrollPosition = (callback: (position: ScrollPosition) => void) => {
  useEffect(() => {
    const handleScroll = () => {
      callback({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

export const useMousePosition = (callback: (x: number, y: number) => void) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      callback(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [callback]);
};

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
};
