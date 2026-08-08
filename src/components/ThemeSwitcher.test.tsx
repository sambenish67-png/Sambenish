import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { renderWithTheme } from '@/test/renderWithTheme';

const THEME_LABELS = [
  'Dark',
  'Light',
  'Cyberpunk',
  'Ocean',
  'Sunset',
  'Forest',
  'Minimal',
  'Aurora',
  'Neural',
  'Glass',
];

describe('ThemeSwitcher', () => {
  it('offers a button for every theme', () => {
    renderWithTheme(<ThemeSwitcher />);

    for (const label of THEME_LABELS) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('highlights the active theme', () => {
    renderWithTheme(<ThemeSwitcher />, { theme: 'ocean' });

    expect(screen.getByRole('button', { name: 'Ocean' }).className).toContain('bg-slate-200');
    expect(screen.getByRole('button', { name: 'Forest' }).className).not.toContain(
      'bg-slate-200 dark:bg-slate-700'
    );
  });

  it('switches to the selected theme and persists it', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeSwitcher />, { theme: 'dark' });

    await user.click(screen.getByRole('button', { name: 'Sunset' }));

    expect(localStorage.getItem('themeMode')).toBe('sunset');
    expect(screen.getByRole('button', { name: 'Sunset' }).className).toContain('bg-slate-200');
  });

  it('allows switching themes repeatedly', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeSwitcher />, { theme: 'dark' });

    await user.click(screen.getByRole('button', { name: 'Neural' }));
    expect(localStorage.getItem('themeMode')).toBe('neural');

    await user.click(screen.getByRole('button', { name: 'Glass' }));
    expect(localStorage.getItem('themeMode')).toBe('glass');
  });
});
