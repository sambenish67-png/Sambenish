import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, renderHook } from '@testing-library/react';
import {
  useIntersectionObserver,
  useMousePosition,
  useScrollPosition,
} from '@/hooks/useCustomHooks';
import { lastObserver, observerInstances } from '@/test/setup';

describe('useScrollPosition', () => {
  it('reports the current scroll offsets on scroll', () => {
    const callback = vi.fn();
    renderHook(() => useScrollPosition(callback));

    Object.defineProperty(window, 'scrollX', { value: 12, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 340, configurable: true });
    fireEvent.scroll(window);

    expect(callback).toHaveBeenCalledWith({ x: 12, y: 340 });
  });

  it('does not invoke the callback before a scroll happens', () => {
    const callback = vi.fn();
    renderHook(() => useScrollPosition(callback));

    expect(callback).not.toHaveBeenCalled();
  });

  it('stops listening once unmounted', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useScrollPosition(callback));

    unmount();
    fireEvent.scroll(window);

    expect(callback).not.toHaveBeenCalled();
  });
});

describe('useMousePosition', () => {
  it('reports client coordinates on mouse move', () => {
    const callback = vi.fn();
    renderHook(() => useMousePosition(callback));

    fireEvent.mouseMove(window, { clientX: 100, clientY: 250 });

    expect(callback).toHaveBeenCalledWith(100, 250);
  });

  it('stops listening once unmounted', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useMousePosition(callback));

    unmount();
    fireEvent.mouseMove(window, { clientX: 1, clientY: 2 });

    expect(callback).not.toHaveBeenCalled();
  });
});

describe('useIntersectionObserver', () => {
  const renderWithRef = (options?: IntersectionObserverInit) => {
    const ref = createRef<HTMLDivElement>();
    const Harness = () => {
      useIntersectionObserver(ref, options);
      return <div ref={ref} data-testid="target" />;
    };
    const utils = render(<Harness />);
    return { ...utils, ref };
  };

  it('observes the referenced element with a default threshold', () => {
    renderWithRef();

    const observer = lastObserver();
    expect(observer?.observe).toHaveBeenCalledTimes(1);
    expect(observer?.options).toMatchObject({ threshold: 0.1 });
  });

  it('lets caller options override the defaults', () => {
    renderWithRef({ threshold: 0.75 });

    expect(lastObserver()?.options).toMatchObject({ threshold: 0.75 });
  });

  it('adds the reveal animation class when the element intersects', () => {
    const { getByTestId } = renderWithRef();
    const target = getByTestId('target');

    lastObserver()?.trigger(true, target);

    expect(target).toHaveClass('animate-slide-up');
  });

  it('leaves the element untouched while it is out of view', () => {
    const { getByTestId } = renderWithRef();
    const target = getByTestId('target');

    lastObserver()?.trigger(false, target);

    expect(target).not.toHaveClass('animate-slide-up');
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderWithRef();
    const observer = lastObserver();

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  it('does not create an observer when the ref is empty', () => {
    const ref = createRef<HTMLElement>();
    renderHook(() => useIntersectionObserver(ref));

    expect(observerInstances).toHaveLength(0);
  });
});
