import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import AuroraBackground from '@/components/AuroraBackground';

describe('AuroraBackground', () => {
  it('renders a decorative layer that ignores pointer events', () => {
    const { container } = render(<AuroraBackground />);

    expect(container.firstElementChild?.className).toContain('pointer-events-none');
  });

  it('renders one floating badge per icon', () => {
    const { container } = render(<AuroraBackground />);

    expect(container.querySelectorAll('svg.lucide')).toHaveLength(5);
  });

  it('centers the cursor glow before any pointer movement', () => {
    const { container } = render(<AuroraBackground />);

    const glow = container.querySelector('[style*="left: 50%"]');
    expect(glow).not.toBeNull();
  });

  it('follows the cursor as a percentage of the viewport', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    const { container } = render(<AuroraBackground />);

    fireEvent.mouseMove(window, { clientX: 250, clientY: 400 });

    const glow = container.querySelector('[style*="left: 25%"]') as HTMLElement;
    expect(glow).not.toBeNull();
    expect(glow.style.top).toBe('50%');
  });

  it('stops tracking the cursor after unmount', () => {
    const { container, unmount } = render(<AuroraBackground />);
    unmount();

    fireEvent.mouseMove(window, { clientX: 10, clientY: 10 });

    expect(container.firstElementChild).toBeNull();
  });
});
