import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import StatCard, { AnimatedCounter } from '@/components/StatCard';
import { renderWithTheme } from '@/test/renderWithTheme';

const runCounter = (ms = 5000) => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('AnimatedCounter', () => {
  it('starts at zero', () => {
    renderWithTheme(<AnimatedCounter value={500} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('counts up to the target value', () => {
    renderWithTheme(<AnimatedCounter value={500} />);

    runCounter();

    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders a prefix and suffix around the value', () => {
    const { container } = renderWithTheme(<AnimatedCounter value={12} prefix="~" suffix="+" />);

    runCounter();

    expect(container.textContent).toBe('~12+');
  });

  it('formats large numbers with locale separators', () => {
    const { container } = renderWithTheme(<AnimatedCounter value={12000} />);

    runCounter();

    expect(container.textContent).toBe((12000).toLocaleString());
  });

  it('reaches the target sooner with a shorter duration', () => {
    const { container } = renderWithTheme(<AnimatedCounter value={60} duration={0.5} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(container.textContent).toBe('60');
  });

  it('counts up to the new target when the value changes', () => {
    const { container, rerender } = renderWithTheme(<AnimatedCounter value={10} />);
    runCounter();
    expect(container.textContent).toBe('10');

    rerender(<AnimatedCounter value={20} />);
    runCounter();

    expect(container.textContent).toBe('20');
  });
});

describe('StatCard', () => {
  it('renders the label', () => {
    renderWithTheme(<StatCard label="Projects" value={8} />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('animates numeric values', () => {
    const { container } = renderWithTheme(<StatCard label="Projects" value={8} suffix="+" />);
    const counter = container.querySelector('span');

    expect(counter).toHaveTextContent('0+');
    runCounter();
    expect(counter).toHaveTextContent('8+');
  });

  it('renders string values verbatim without a counter', () => {
    renderWithTheme(<StatCard label="Status" value="Open to work" />);

    runCounter();

    expect(screen.getByText('Open to work')).toBeInTheDocument();
  });

  it('renders an optional icon', () => {
    renderWithTheme(
      <StatCard label="Projects" value="8" icon={<span data-testid="icon">*</span>} />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('omits the icon container when no icon is given', () => {
    const { container } = renderWithTheme(<StatCard label="Projects" value="8" />);

    expect(container.querySelector('.text-4xl')).toBeNull();
  });

  it('themes the card surface', () => {
    const dark = renderWithTheme(<StatCard label="Projects" value="8" />, { theme: 'dark' });
    expect(dark.container.firstElementChild?.className).toContain('bg-slate-800/50');
    dark.unmount();

    const light = renderWithTheme(<StatCard label="Projects" value="8" />, { theme: 'light' });
    expect(light.container.firstElementChild?.className).toContain('bg-white/50');
  });
});
