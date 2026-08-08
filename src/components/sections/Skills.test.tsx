import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Skills from '@/components/sections/Skills';
import { SKILLS_DATA } from '@/utils/data';
import { renderWithTheme } from '@/test/renderWithTheme';

const firstGroup = SKILLS_DATA[0]!;
const otherGroup = SKILLS_DATA[1]!;

describe('Skills', () => {
  it('renders the section header', () => {
    renderWithTheme(<Skills />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Skills & Expertise' })
    ).toBeInTheDocument();
    expect(screen.getByText('My Technical Arsenal')).toBeInTheDocument();
  });

  it('renders a filter button per category plus "All Skills"', () => {
    renderWithTheme(<Skills />);

    expect(screen.getByRole('button', { name: 'All Skills' })).toBeInTheDocument();
    for (const group of SKILLS_DATA) {
      expect(screen.getByRole('button', { name: group.category })).toBeInTheDocument();
    }
  });

  it('shows every skill group by default', () => {
    renderWithTheme(<Skills />);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(SKILLS_DATA.length);
    for (const skill of firstGroup.skills) {
      expect(screen.getAllByText(skill).length).toBeGreaterThan(0);
    }
  });

  it('marks "All Skills" as the active filter initially', () => {
    renderWithTheme(<Skills />);

    expect(screen.getByRole('button', { name: 'All Skills' }).className).toContain(
      'bg-gradient-aurora'
    );
  });

  it('filters the grid down to the selected category', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Skills />);

    await user.click(screen.getByRole('button', { name: firstGroup.category }));

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 3, name: firstGroup.category })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 3, name: otherGroup.category })
    ).not.toBeInTheDocument();
  });

  it('restores every group when "All Skills" is selected again', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Skills />);

    await user.click(screen.getByRole('button', { name: firstGroup.category }));
    await user.click(screen.getByRole('button', { name: 'All Skills' }));

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(SKILLS_DATA.length);
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<Skills />, { theme: 'dark' });
    expect(dark.container.querySelector('#skills')?.className).toContain('bg-slate-800/50');
    dark.unmount();

    const light = renderWithTheme(<Skills />, { theme: 'light' });
    expect(light.container.querySelector('#skills')?.className).toContain('bg-slate-50');
  });
});
