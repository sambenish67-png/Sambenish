import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider, type ThemeMode } from '@/context/ThemeContext';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  theme?: ThemeMode;
}

/** Renders a component inside a ThemeProvider pinned to a known theme. */
export const renderWithTheme = (ui: ReactElement, { theme = 'dark', ...options }: Options = {}) => {
  localStorage.setItem('themeMode', theme);
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options,
  });
};
