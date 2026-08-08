import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Card, { GlassCard } from '@/components/Card';
import { renderWithTheme } from '@/test/renderWithTheme';

const cardRoot = (testId: string) => screen.getByTestId(testId).closest('div.relative');

describe('Card', () => {
  it('renders its children', () => {
    renderWithTheme(
      <Card>
        <span data-testid="child">content</span>
      </Card>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('appends a custom className', () => {
    const { container } = renderWithTheme(
      <Card className="p-8">
        <span data-testid="child">content</span>
      </Card>
    );

    expect(container.firstElementChild?.className).toContain('p-8');
  });

  it('applies dark theme surface styles', () => {
    const { container } = renderWithTheme(
      <Card>
        <span data-testid="child">content</span>
      </Card>,
      { theme: 'dark' }
    );

    expect(container.firstElementChild?.className).toContain('bg-slate-800/50');
  });

  it('applies light theme surface styles', () => {
    const { container } = renderWithTheme(
      <Card>
        <span data-testid="child">content</span>
      </Card>,
      { theme: 'light' }
    );

    expect(container.firstElementChild?.className).toContain('bg-white/50');
  });

  it('adds the hover glow by default and drops it when hover is disabled', () => {
    const withHover = renderWithTheme(
      <Card>
        <span data-testid="child">content</span>
      </Card>
    );
    expect(withHover.container.firstElementChild?.className).toContain('hover:shadow-neon');
    withHover.unmount();

    const withoutHover = renderWithTheme(
      <Card hover={false}>
        <span data-testid="child">content</span>
      </Card>
    );
    expect(withoutHover.container.firstElementChild?.className).not.toContain(
      'hover:shadow-neon'
    );
  });

  it('is exported as the default export', () => {
    renderWithTheme(
      <Card delay={0.2}>
        <span data-testid="child">delayed</span>
      </Card>
    );

    expect(cardRoot('child')).not.toBeNull();
  });
});

describe('GlassCard', () => {
  it('renders its children', () => {
    renderWithTheme(
      <GlassCard>
        <span data-testid="child">glass</span>
      </GlassCard>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('glass');
  });

  it('applies theme-aware gradient surfaces', () => {
    const dark = renderWithTheme(
      <GlassCard>
        <span data-testid="child">glass</span>
      </GlassCard>,
      { theme: 'dark' }
    );
    expect(dark.container.firstElementChild?.className).toContain('from-slate-800/30');
    dark.unmount();

    const light = renderWithTheme(
      <GlassCard>
        <span data-testid="child">glass</span>
      </GlassCard>,
      { theme: 'light' }
    );
    expect(light.container.firstElementChild?.className).toContain('from-white/30');
  });

  it('adds the aurora gradient tint when gradient is enabled', () => {
    const { container } = renderWithTheme(
      <GlassCard gradient>
        <span data-testid="child">glass</span>
      </GlassCard>
    );

    expect(container.firstElementChild?.className).toContain('bg-gradient-aurora/10');
  });

  it('omits the aurora gradient tint by default', () => {
    const { container } = renderWithTheme(
      <GlassCard>
        <span data-testid="child">glass</span>
      </GlassCard>
    );

    expect(container.firstElementChild?.className).not.toContain('bg-gradient-aurora/10');
  });
});
