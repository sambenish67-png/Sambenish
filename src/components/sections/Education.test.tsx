import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Education from '@/components/sections/Education';
import { EDUCATION_DATA } from '@/utils/data';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('Education', () => {
  it('renders the section header', () => {
    renderWithTheme(<Education />);

    expect(screen.getByRole('heading', { level: 2, name: 'Education' })).toBeInTheDocument();
    expect(screen.getByText('My Academic Journey')).toBeInTheDocument();
  });

  it('renders a timeline entry for every education record', () => {
    renderWithTheme(<Education />);

    for (const entry of EDUCATION_DATA) {
      expect(
        screen.getByRole('heading', { level: 3, name: entry.institution })
      ).toBeInTheDocument();
      expect(screen.getByText(entry.degree)).toBeInTheDocument();
      expect(screen.getByText(entry.field)).toBeInTheDocument();
      expect(screen.getByText(entry.description)).toBeInTheDocument();
    }
  });

  it('shows a grade only for records that have one', () => {
    renderWithTheme(<Education />);

    for (const entry of EDUCATION_DATA) {
      if (entry.grade) {
        expect(screen.getByText(entry.grade)).toBeInTheDocument();
      }
    }
    const gradeCount = EDUCATION_DATA.filter((entry) => entry.grade).length;
    expect(screen.queryAllByText(/CGPA/)).toHaveLength(gradeCount);
  });

  it('alternates the timeline side for consecutive entries', () => {
    const { container } = renderWithTheme(<Education />);

    const rows = container.querySelectorAll('#education .space-y-12 > div');
    expect(rows).toHaveLength(EDUCATION_DATA.length);
    expect(rows[0]?.className).toContain('md:flex-row');
    if (rows.length > 1) {
      expect(rows[1]?.className).toContain('md:flex-row-reverse');
    }
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<Education />, { theme: 'dark' });
    expect(dark.container.querySelector('#education')?.className).toContain('bg-slate-900');
    dark.unmount();

    const light = renderWithTheme(<Education />, { theme: 'light' });
    expect(light.container.querySelector('#education')?.className).toContain('bg-white');
  });
});
