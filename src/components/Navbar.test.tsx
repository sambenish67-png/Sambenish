import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar';
import { renderWithTheme } from '@/test/renderWithTheme';

const NAV_LINKS = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Contact'];

const addSection = (id: string) => {
  const section = document.createElement('section');
  section.id = id;
  const scrollIntoView = vi.fn();
  section.scrollIntoView = scrollIntoView;
  document.body.appendChild(section);
  return scrollIntoView;
};

afterEach(() => {
  document.querySelectorAll('section').forEach((section) => section.remove());
});

describe('Navbar', () => {
  it('renders the logo and every desktop nav link', () => {
    renderWithTheme(<Navbar />);

    const nav = screen.getByRole('navigation');
    expect(within(nav).getByText('SB')).toBeInTheDocument();
    for (const link of NAV_LINKS) {
      expect(within(nav).getByRole('button', { name: link })).toBeInTheDocument();
    }
  });

  it('smooth-scrolls to the matching section when a link is clicked', async () => {
    const scrollIntoView = addSection('projects');
    const user = userEvent.setup();
    renderWithTheme(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Projects' }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('does not throw when the target section is missing', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Navbar />);

    await expect(user.click(screen.getByRole('button', { name: 'Skills' }))).resolves.not.toThrow();
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(<Navbar />);

    expect(container.querySelector('.md\\:hidden.pb-4')).toBeNull();

    const buttons = screen.getAllByRole('button');
    const menuToggle = buttons[buttons.length - 1] as HTMLElement;
    await user.click(menuToggle);
    expect(container.querySelector('.md\\:hidden.pb-4')).not.toBeNull();

    await user.click(menuToggle);
    expect(container.querySelector('.md\\:hidden.pb-4')).toBeNull();
  });

  it('closes the mobile menu after navigating', async () => {
    addSection('about');
    const user = userEvent.setup();
    const { container } = renderWithTheme(<Navbar />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[buttons.length - 1] as HTMLElement);

    const mobileMenu = container.querySelector('.md\\:hidden.pb-4') as HTMLElement;
    await user.click(within(mobileMenu).getByRole('button', { name: 'About' }));

    expect(container.querySelector('.md\\:hidden.pb-4')).toBeNull();
  });

  it('advances the theme when the theme button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Navbar />, { theme: 'dark' });

    const themeButton = screen.getAllByRole('button')[NAV_LINKS.length] as HTMLElement;
    await user.click(themeButton);

    expect(localStorage.getItem('themeMode')).toBe('light');
  });

  it('themes the nav surface', () => {
    const dark = renderWithTheme(<Navbar />, { theme: 'dark' });
    expect(screen.getByRole('navigation').className).toContain('bg-slate-900/80');
    dark.unmount();

    renderWithTheme(<Navbar />, { theme: 'light' });
    expect(screen.getByRole('navigation').className).toContain('bg-white/80');
  });
});
