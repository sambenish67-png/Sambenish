import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import ProjectOverview from '@/components/sections/Projects';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('ProjectOverview', () => {
  it('renders the project title in the header and highlight card', () => {
    renderWithTheme(<ProjectOverview />);

    expect(screen.getByRole('heading', { level: 2, name: 'Aurora Calm' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Aurora Calm' })).toBeInTheDocument();
    expect(screen.getByText('Project Overview')).toBeInTheDocument();
  });

  it('describes the role and experience', () => {
    renderWithTheme(<ProjectOverview />);

    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Mobile App Developer')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Mindful UI & Motion')).toBeInTheDocument();
  });

  it('repeats the project description in the highlight and about cards', () => {
    renderWithTheme(<ProjectOverview />);

    expect(screen.getAllByText(/cross-platform meditation and wellness application/)).toHaveLength(
      2
    );
  });

  it('renders the about and design detail cards', () => {
    renderWithTheme(<ProjectOverview />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'About the Project' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Design Details' })).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<ProjectOverview />, { theme: 'dark' });
    expect(dark.container.querySelector('#projects')?.className).toContain('bg-slate-950');
    dark.unmount();

    const light = renderWithTheme(<ProjectOverview />, { theme: 'light' });
    expect(light.container.querySelector('#projects')?.className).toContain('bg-slate-50');
  });
});
