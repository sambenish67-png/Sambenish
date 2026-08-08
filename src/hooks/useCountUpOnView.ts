import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  /** Number of animation steps used to reach the target value. */
  steps?: number;
  /** Delay between steps, in milliseconds. */
  intervalMs?: number;
  /** When false the target value is shown immediately. */
  animated?: boolean;
}

/**
 * Counts up from 0 to `target` the first time the returned ref enters the viewport.
 */
export const useCountUpOnView = <T extends Element>(
  target: number,
  { steps = 30, intervalMs = 20, animated = true }: CountUpOptions = {}
): [number, React.RefObject<T>] => {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!animated) {
      setValue(target);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || interval) return;

        interval = setInterval(() => {
          setValue((prev) => {
            const next = prev + target / steps;
            if (next >= target) {
              clearInterval(interval);
              interval = undefined;
              return target;
            }
            return next;
          });
        }, intervalMs);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [target, steps, intervalMs, animated]);

  return [value, ref];
};
