import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { GlobalStyles } from '@/styles/global';

describe('GlobalStyles', () => {
  it('renders a single inline style element', () => {
    const { container } = render(<GlobalStyles />);

    expect(container.querySelectorAll('style')).toHaveLength(1);
  });

  it('enables smooth scrolling with a scroll offset for the fixed navbar', () => {
    const { container } = render(<GlobalStyles />);

    const css = container.querySelector('style')?.textContent ?? '';
    expect(css).toContain('scroll-behavior: smooth');
    expect(css).toContain('scroll-padding-top: 80px');
  });

  it('drives colors from the theme custom properties', () => {
    const { container } = render(<GlobalStyles />);

    const css = container.querySelector('style')?.textContent ?? '';
    expect(css).toContain('var(--bg-primary');
    expect(css).toContain('var(--text-color');
    expect(css).toContain('var(--neural-grid');
  });

  it('keeps visible focus styles for interactive elements', () => {
    const { container } = render(<GlobalStyles />);

    const css = container.querySelector('style')?.textContent ?? '';
    expect(css).toContain('focus-visible');
    expect(css).toContain('outline: 2px solid');
  });
});
