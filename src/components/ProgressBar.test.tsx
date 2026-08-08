import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import ProgressBar, { CircularProgress } from '@/components/ProgressBar';
import { renderWithTheme } from '@/test/renderWithTheme';
import { lastObserver } from '@/test/setup';

/** Runs the component's stepping interval long enough to reach the target value. */
const advanceAnimation = () => {
  act(() => {
    vi.advanceTimersByTime(2000);
  });
};

const enterViewport = () => {
  act(() => {
    lastObserver()?.trigger(true);
  });
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ProgressBar', () => {
  it('starts at 0% before the bar scrolls into view', () => {
    renderWithTheme(<ProgressBar percentage={80} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('animates up to the target percentage once visible', () => {
    renderWithTheme(<ProgressBar percentage={80} />);

    enterViewport();
    advanceAnimation();

    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('stays at 0% while the bar is out of view', () => {
    renderWithTheme(<ProgressBar percentage={80} />);

    act(() => {
      lastObserver()?.trigger(false);
    });
    advanceAnimation();

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('skips the animation when animated is false', () => {
    renderWithTheme(<ProgressBar percentage={80} animated={false} />);

    enterViewport();
    advanceAnimation();

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('applies the custom gradient color classes', () => {
    const { container } = renderWithTheme(
      <ProgressBar percentage={50} color="from-red-500 to-orange-500" />
    );

    expect(container.querySelector('.from-red-500')).not.toBeNull();
  });

  it('themes the track background', () => {
    const dark = renderWithTheme(<ProgressBar percentage={50} />, { theme: 'dark' });
    expect(dark.container.querySelector('.bg-slate-700')).not.toBeNull();
    dark.unmount();

    const light = renderWithTheme(<ProgressBar percentage={50} />, { theme: 'light' });
    expect(light.container.querySelector('.bg-slate-300')).not.toBeNull();
  });

  it('observes the bar and disconnects on unmount', () => {
    const { unmount } = renderWithTheme(<ProgressBar percentage={50} />);
    const observer = lastObserver();

    expect(observer?.observe).toHaveBeenCalledTimes(1);
    unmount();
    expect(observer?.disconnect).toHaveBeenCalled();
  });
});

describe('CircularProgress', () => {
  it('starts at 0% and animates to the target once visible', () => {
    renderWithTheme(<CircularProgress percentage={65} />);
    expect(screen.getByText('0%')).toBeInTheDocument();

    enterViewport();
    advanceAnimation();

    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('renders at the requested size', () => {
    const { container } = renderWithTheme(<CircularProgress percentage={40} size={200} />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('defaults to a 120px diameter', () => {
    const { container } = renderWithTheme(<CircularProgress percentage={40} />);

    expect(container.querySelector('svg')).toHaveAttribute('width', '120');
  });

  it('renders an optional label', () => {
    renderWithTheme(<CircularProgress percentage={40} label="Frontend" />);

    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('omits the label element when no label is given', () => {
    const { container } = renderWithTheme(<CircularProgress percentage={40} />);

    expect(container.querySelector('p')).toBeNull();
  });

  it('themes the track stroke', () => {
    const dark = renderWithTheme(<CircularProgress percentage={40} />, { theme: 'dark' });
    expect(dark.container.querySelector('circle')).toHaveAttribute('stroke', '#334155');
    dark.unmount();

    const light = renderWithTheme(<CircularProgress percentage={40} />, { theme: 'light' });
    expect(light.container.querySelector('circle')).toHaveAttribute('stroke', '#cbd5e1');
  });
});
