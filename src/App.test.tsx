import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import type { ThemeMode } from '@/context/ThemeContext';

const renderApp = (theme?: ThemeMode) => {
  if (theme) localStorage.setItem('themeMode', theme);
  return render(<App />);
};

describe('App', () => {
  it('renders the navbar, every section and the footer', () => {
    const { container } = renderApp('dark');

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    for (const id of [
      'home',
      'about',
      'education',
      'internships',
      'skills',
      'projects',
      'interests',
      'contact',
    ]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('renders the sections in document order inside main', () => {
    const { container } = renderApp('dark');

    const ids = Array.from(container.querySelectorAll('main > section')).map(
      (section) => section.id
    );
    expect(ids).toEqual([
      'home',
      'about',
      'education',
      'internships',
      'skills',
      'projects',
      'interests',
      'contact',
    ]);
  });

  it.each([
    ['dark', 'from-slate-900 to-slate-950'],
    ['light', 'from-white to-slate-50'],
    ['cyberpunk', 'via-purple-950'],
    ['ocean', 'via-blue-900'],
    ['sunset', 'via-red-50'],
    ['forest', 'via-green-950'],
    ['minimal', 'from-gray-50 to-gray-100'],
  ] as [ThemeMode, string][])('applies the %s background gradient', (theme, expected) => {
    const { container } = renderApp(theme);

    expect(container.firstElementChild?.className).toContain(expected);
  });

  it('falls back to the dark gradient for themes without a dedicated background', () => {
    const { container } = renderApp('aurora');

    expect(container.firstElementChild?.className).toContain('from-slate-900 to-slate-950');
  });

  it('adds the dark text treatment only for dark themes', () => {
    const dark = renderApp('dark');
    expect(dark.container.firstElementChild?.className).toContain('dark text-white');
    dark.unmount();

    const light = renderApp('light');
    expect(light.container.firstElementChild?.className).toContain('text-slate-900');
  });

  it('renders the global styles and the theme switcher', () => {
    const { container } = renderApp('dark');

    expect(container.querySelector('style')).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Cyberpunk' })).toBeInTheDocument();
  });
});
