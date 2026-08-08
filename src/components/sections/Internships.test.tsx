import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Internships from '@/components/sections/Internships';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('Internships', () => {
  it('renders the section header', () => {
    renderWithTheme(<Internships />);

    expect(screen.getByRole('heading', { level: 2, name: 'Internship' })).toBeInTheDocument();
    expect(screen.getByText('💼 Internship Experience')).toBeInTheDocument();
  });

  it('renders a card per internship with role, company and duration', () => {
    renderWithTheme(<Internships />);

    const roles = ['UI/UX Design Intern', 'React Native & Web Developer Intern'];
    for (const role of roles) {
      expect(screen.getByRole('heading', { level: 4, name: role })).toBeInTheDocument();
    }
    expect(screen.getAllByText('@ App Innovation & AI Tech')).toHaveLength(roles.length);
    expect(screen.getByText('15 Days')).toBeInTheDocument();
    expect(screen.getByText('3 Months')).toBeInTheDocument();
  });

  it('lists the responsibilities as bullet lines', () => {
    renderWithTheme(<Internships />);

    expect(screen.getByText('• Completed intensive UI/UX Design training.')).toBeInTheDocument();
    expect(
      screen.getByText('• Integrated Firebase services and REST APIs.')
    ).toBeInTheDocument();
  });

  it('lists the technologies used in each internship', () => {
    renderWithTheme(<Internships />);

    expect(screen.getByText('Figma')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
  });

  it('renders a certificate link per internship that opens safely', () => {
    renderWithTheme(<Internships />);

    const links = screen.getAllByRole('link', { name: /Certificate/ });
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<Internships />, { theme: 'dark' });
    expect(dark.container.querySelector('#internships')?.className).toContain('bg-slate-950');
    dark.unmount();

    const light = renderWithTheme(<Internships />, { theme: 'light' });
    expect(light.container.querySelector('#internships')?.className).toContain('bg-slate-50');
  });
});
