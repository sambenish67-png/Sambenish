import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme, type ThemeMode } from '@/context/ThemeContext';

const THEME_CYCLE: ThemeMode[] = [
  'dark',
  'light',
  'cyberpunk',
  'ocean',
  'sunset',
  'forest',
  'minimal',
  'aurora',
  'neural',
  'glass',
];

const DARK_THEMES: ThemeMode[] = ['dark', 'cyberpunk', 'forest', 'aurora', 'neural'];

const mockPrefersDark = (matches: boolean) => {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList
  );
};

const renderTheme = () =>
  renderHook(() => useTheme(), {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });

beforeEach(() => {
  vi.restoreAllMocks();
  mockPrefersDark(false);
  document.documentElement.className = '';
  document.documentElement.removeAttribute('style');
});

describe('useTheme', () => {
  it('throws when used outside of a ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within ThemeProvider'
    );
  });
});

describe('ThemeProvider initial theme', () => {
  it('restores a persisted theme', () => {
    localStorage.setItem('themeMode', 'ocean');

    expect(renderTheme().result.current.themeMode).toBe('ocean');
  });

  it('ignores an unknown persisted theme and falls back to the system preference', () => {
    localStorage.setItem('themeMode', 'not-a-theme');
    mockPrefersDark(true);

    expect(renderTheme().result.current.themeMode).toBe('dark');
  });

  it('uses light mode when the system does not prefer dark', () => {
    mockPrefersDark(false);

    expect(renderTheme().result.current.themeMode).toBe('light');
  });

  it('persists the resolved theme to localStorage', () => {
    renderTheme();

    expect(localStorage.getItem('themeMode')).toBe('light');
  });
});

describe('ThemeProvider isDark', () => {
  it.each(THEME_CYCLE)('derives isDark for the %s theme', (theme) => {
    localStorage.setItem('themeMode', theme);

    expect(renderTheme().result.current.isDark).toBe(DARK_THEMES.includes(theme));
  });
});

describe('ThemeProvider document side effects', () => {
  it.each(DARK_THEMES)('adds the dark class for the %s theme', (theme) => {
    localStorage.setItem('themeMode', theme);
    renderTheme();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it.each(['light', 'sunset', 'minimal', 'glass'] as ThemeMode[])(
    'does not add the dark class for the %s theme',
    (theme) => {
      localStorage.setItem('themeMode', theme);
      renderTheme();

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    }
  );

  it.each(THEME_CYCLE)('sets background and text custom properties for %s', (theme) => {
    localStorage.setItem('themeMode', theme);
    renderTheme();

    const style = document.documentElement.style;
    expect(style.getPropertyValue('--bg-primary')).not.toBe('');
    expect(style.getPropertyValue('--bg-secondary')).not.toBe('');
    expect(style.getPropertyValue('--text-color')).not.toBe('');
  });

  it('sets the aurora gradient only for the aurora theme', () => {
    localStorage.setItem('themeMode', 'aurora');
    renderTheme();

    expect(document.documentElement.style.getPropertyValue('--gradient-aurora')).toContain(
      'radial-gradient'
    );
  });

  it('sets the neural grid only for the neural theme', () => {
    localStorage.setItem('themeMode', 'neural');
    renderTheme();

    expect(document.documentElement.style.getPropertyValue('--neural-grid')).toContain(
      'repeating-linear-gradient'
    );
  });
});

describe('setTheme', () => {
  it('switches to the requested theme and persists it', async () => {
    const { result, rerender } = renderTheme();

    result.current.setTheme('cyberpunk');
    rerender();

    expect(result.current.themeMode).toBe('cyberpunk');
    expect(result.current.isDark).toBe(true);
    expect(localStorage.getItem('themeMode')).toBe('cyberpunk');
  });
});

describe('toggleTheme', () => {
  it('advances through every theme and wraps back to the first', async () => {
    const user = userEvent.setup();
    const Consumer = () => {
      const { themeMode, toggleTheme } = useTheme();
      return (
        <button onClick={toggleTheme} data-testid="toggle">
          {themeMode}
        </button>
      );
    };

    localStorage.setItem('themeMode', 'dark');
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );

    const toggle = screen.getByTestId('toggle');
    expect(toggle).toHaveTextContent('dark');

    for (let index = 1; index <= THEME_CYCLE.length; index += 1) {
      await user.click(toggle);
      expect(toggle).toHaveTextContent(THEME_CYCLE[index % THEME_CYCLE.length] as string);
    }
  });
});
