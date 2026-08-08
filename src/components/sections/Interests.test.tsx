import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Interests from '@/components/sections/Interests';
import { INTERESTS_DATA } from '@/utils/data';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('Interests', () => {
  it('renders the section header', () => {
    renderWithTheme(<Interests />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Interests & Passions' })
    ).toBeInTheDocument();
    expect(screen.getByText('What Drives Me')).toBeInTheDocument();
  });

  it('renders a card for every interest', () => {
    renderWithTheme(<Interests />);

    for (const interest of INTERESTS_DATA) {
      expect(
        screen.getByRole('heading', { level: 3, name: interest.title })
      ).toBeInTheDocument();
      expect(screen.getByText(interest.description)).toBeInTheDocument();
      expect(screen.getByText(interest.icon)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(INTERESTS_DATA.length);
  });

  it('links the bottom call to action to the contact section', () => {
    renderWithTheme(<Interests />);

    expect(screen.getByRole('link', { name: /Let's Build Something Amazing/ })).toHaveAttribute(
      'href',
      '#contact'
    );
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<Interests />, { theme: 'dark' });
    expect(dark.container.querySelector('#interests')?.className).toContain('bg-slate-800/50');
    dark.unmount();

    const light = renderWithTheme(<Interests />, { theme: 'light' });
    expect(light.container.querySelector('#interests')?.className).toContain('bg-slate-50');
  });
});
