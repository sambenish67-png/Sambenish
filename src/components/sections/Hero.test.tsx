import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from '@/components/sections/Hero';
import { renderWithTheme } from '@/test/renderWithTheme';

const addSection = (id: string) => {
  const section = document.createElement('section');
  section.id = id;
  const scrollIntoView = vi.fn();
  section.scrollIntoView = scrollIntoView;
  document.body.appendChild(section);
  return scrollIntoView;
};

afterEach(() => {
  document.querySelectorAll('body > section').forEach((section) => section.remove());
});

describe('Hero', () => {
  it('renders the name, title and description', () => {
    renderWithTheme(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hey, I'm");
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sam Benish');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('AI & Data Science Student');
    expect(screen.getByText(/Building innovative mobile apps/)).toBeInTheDocument();
  });

  it('renders the three call-to-action buttons', () => {
    renderWithTheme(<Hero />);

    for (const label of ['Contact Me', 'View Projects', 'Resume']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('scrolls to the contact section from the primary button', async () => {
    const scrollIntoView = addSection('contact');
    const user = userEvent.setup();
    renderWithTheme(<Hero />);

    await user.click(screen.getByRole('button', { name: 'Contact Me' }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls to the projects section from the outline button', async () => {
    const scrollIntoView = addSection('projects');
    const user = userEvent.setup();
    renderWithTheme(<Hero />);

    await user.click(screen.getByRole('button', { name: 'View Projects' }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('does not throw when the target sections are absent', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Hero />);

    await expect(
      user.click(screen.getByRole('button', { name: 'View Projects' }))
    ).resolves.not.toThrow();
  });

  it('tracks the pointer without crashing', () => {
    const { container } = renderWithTheme(<Hero />);
    const section = container.querySelector('#home') as HTMLElement;

    fireEvent.mouseMove(section, { clientX: 40, clientY: 60 });

    expect(section).toBeInTheDocument();
  });

  it('shows the scroll indicator', () => {
    renderWithTheme(<Hero />);

    expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<Hero />, { theme: 'dark' });
    expect(dark.container.querySelector('#home')?.className).toContain('bg-slate-900');
    dark.unmount();

    const light = renderWithTheme(<Hero />, { theme: 'light' });
    expect(light.container.querySelector('#home')?.className).toContain('bg-white');
  });
});
