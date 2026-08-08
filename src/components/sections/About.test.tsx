import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import About from '@/components/sections/About';
import { ABOUT_DATA } from '@/utils/data';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('About', () => {
  it('renders the section header', () => {
    renderWithTheme(<About />);

    expect(screen.getByRole('heading', { level: 2, name: 'About Me' })).toBeInTheDocument();
    expect(screen.getByText('Know Me Better')).toBeInTheDocument();
  });

  it('shows the professional summary and career objective copy', () => {
    renderWithTheme(<About />);

    expect(screen.getByText(ABOUT_DATA.summary)).toBeInTheDocument();
    expect(screen.getByText(ABOUT_DATA.objective)).toBeInTheDocument();
  });

  it('links the call to action to the contact section', () => {
    renderWithTheme(<About />);

    expect(screen.getByRole('link', { name: /Let's Connect/ })).toHaveAttribute('href', '#contact');
  });

  it('renders a passion card for each highlight', () => {
    renderWithTheme(<About />);

    expect(
      screen.getByRole('heading', { level: 3, name: "What I'm Passionate About" })
    ).toBeInTheDocument();
    for (const title of ['AI & Machine Learning', 'Mobile Development', 'UI/UX Design']) {
      expect(screen.getByRole('heading', { level: 4, name: title })).toBeInTheDocument();
    }
  });

  it('hides the statistics block when there are no stats', () => {
    renderWithTheme(<About />);

    const hasStats = ABOUT_DATA.stats.length > 0;
    expect(screen.queryByText('By The Numbers') !== null).toBe(hasStats);
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<About />, { theme: 'dark' });
    expect(dark.container.querySelector('#about')?.className).toContain('bg-slate-800/50');
    dark.unmount();

    const light = renderWithTheme(<About />, { theme: 'light' });
    expect(light.container.querySelector('#about')?.className).toContain('bg-slate-50');
  });
});
