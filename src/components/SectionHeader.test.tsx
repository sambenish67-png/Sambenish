import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import SectionHeader from '@/components/SectionHeader';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('SectionHeader', () => {
  it('renders the title as a level 2 heading', () => {
    renderWithTheme(<SectionHeader title="Projects" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
  });

  it('renders the optional subtitle and description', () => {
    renderWithTheme(
      <SectionHeader title="Projects" subtitle="Portfolio" description="Selected work." />
    );

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Selected work.')).toBeInTheDocument();
  });

  it('omits subtitle and description when not provided', () => {
    renderWithTheme(<SectionHeader title="Projects" />);

    expect(screen.queryByText('Portfolio')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 }).parentElement?.children).toHaveLength(1);
  });

  it.each([
    ['left', 'text-left'],
    ['center', 'text-center'],
    ['right', 'text-right'],
  ] as const)('aligns content %s', (align, expectedClass) => {
    const { container } = renderWithTheme(<SectionHeader title="Projects" align={align} />);

    expect(container.firstElementChild).toHaveClass(expectedClass);
  });

  it('centers by default', () => {
    const { container } = renderWithTheme(<SectionHeader title="Projects" />);

    expect(container.firstElementChild).toHaveClass('text-center');
  });

  it('centers the description only for centered headers', () => {
    const centered = renderWithTheme(
      <SectionHeader title="Projects" description="Selected work." />
    );
    expect(screen.getByText('Selected work.').className).toContain('mx-auto');
    centered.unmount();

    renderWithTheme(<SectionHeader title="Projects" description="Selected work." align="left" />);
    expect(screen.getByText('Selected work.').className).not.toContain('mx-auto');
  });

  it('themes the description text color', () => {
    const dark = renderWithTheme(<SectionHeader title="Projects" description="Work." />, {
      theme: 'dark',
    });
    expect(screen.getByText('Work.').className).toContain('text-slate-400');
    dark.unmount();

    renderWithTheme(<SectionHeader title="Projects" description="Work." />, { theme: 'light' });
    expect(screen.getByText('Work.').className).toContain('text-slate-600');
  });
});
