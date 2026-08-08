import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '@/components/Footer';
import { PORTFOLIO_DATA } from '@/utils/data';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('Footer', () => {
  it('renders the brand name and tagline', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByRole('heading', { level: 3, name: 'Sam Benish' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Quick Links' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Follow Me' })).toBeInTheDocument();
  });

  it('links quick links to their section anchors', () => {
    renderWithTheme(<Footer />);

    for (const label of ['Home', 'About', 'Projects', 'Contact']) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        `#${label.toLowerCase()}`
      );
    }
  });

  it('links social icons to the portfolio contact details', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      PORTFOLIO_DATA.linkedin
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      PORTFOLIO_DATA.github
    );
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      `mailto:${PORTFOLIO_DATA.email}`
    );
  });

  it('opens external social links safely in a new tab', () => {
    renderWithTheme(<Footer />);

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows the current year in the copyright line', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2031-05-05T00:00:00Z'));

    renderWithTheme(<Footer />);
    expect(screen.getByText(/2031 Sam Benish/)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('scrolls to the top when "Back to Top" is clicked', async () => {
    const scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
    const user = userEvent.setup();
    renderWithTheme(<Footer />);

    await user.click(screen.getByRole('button', { name: 'Back to Top' }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    vi.unstubAllGlobals();
  });

  it('themes the footer surface', () => {
    const dark = renderWithTheme(<Footer />, { theme: 'dark' });
    expect(screen.getByRole('contentinfo').className).toContain('bg-slate-900');
    dark.unmount();

    renderWithTheme(<Footer />, { theme: 'light' });
    expect(screen.getByRole('contentinfo').className).toContain('bg-slate-50');
  });
});
