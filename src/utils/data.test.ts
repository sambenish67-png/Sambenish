import { describe, expect, it } from 'vitest';
import {
  ABOUT_DATA,
  EDUCATION_DATA,
  INTERESTS_DATA,
  PORTFOLIO_DATA,
  PROJECTS_DATA,
  SKILLS_DATA,
} from '@/utils/data';

const isHttpUrl = (value: string) => /^https?:\/\//.test(value);

describe('PORTFOLIO_DATA', () => {
  it('exposes non-empty contact details', () => {
    expect(PORTFOLIO_DATA.name).not.toBe('');
    expect(PORTFOLIO_DATA.title).not.toBe('');
    expect(PORTFOLIO_DATA.tagline).not.toBe('');
    expect(PORTFOLIO_DATA.location).not.toBe('');
    expect(PORTFOLIO_DATA.phone).not.toBe('');
  });

  it('uses a valid email address', () => {
    expect(PORTFOLIO_DATA.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('uses absolute urls for social links', () => {
    for (const url of [PORTFOLIO_DATA.linkedin, PORTFOLIO_DATA.github, PORTFOLIO_DATA.twitter]) {
      expect(isHttpUrl(url)).toBe(true);
    }
  });
});

describe('ABOUT_DATA', () => {
  it('provides summary, description and objective copy', () => {
    expect(ABOUT_DATA.summary.length).toBeGreaterThan(0);
    expect(ABOUT_DATA.description.length).toBeGreaterThan(0);
    expect(ABOUT_DATA.objective.length).toBeGreaterThan(0);
  });

  it('exposes stats as an array', () => {
    expect(Array.isArray(ABOUT_DATA.stats)).toBe(true);
  });
});

describe('SKILLS_DATA', () => {
  it('is non-empty', () => {
    expect(SKILLS_DATA.length).toBeGreaterThan(0);
  });

  it('gives every category a label, icon and at least one skill', () => {
    for (const entry of SKILLS_DATA) {
      expect(entry.category).not.toBe('');
      expect(entry.icon).not.toBe('');
      expect(entry.skills.length).toBeGreaterThan(0);
    }
  });

  it('keeps proficiency within 0-100', () => {
    for (const entry of SKILLS_DATA) {
      expect(entry.proficiency).toBeGreaterThanOrEqual(0);
      expect(entry.proficiency).toBeLessThanOrEqual(100);
    }
  });

  it('has unique categories', () => {
    const categories = SKILLS_DATA.map((entry) => entry.category);
    expect(new Set(categories).size).toBe(categories.length);
  });
});

describe('EDUCATION_DATA', () => {
  it('has unique ids', () => {
    const ids = EDUCATION_DATA.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('describes each entry with institution, degree, field and period', () => {
    for (const entry of EDUCATION_DATA) {
      expect(entry.institution).not.toBe('');
      expect(entry.degree).not.toBe('');
      expect(entry.field).not.toBe('');
      expect(entry.period).toMatch(/^\d{4}\s*-\s*\d{4}$/);
      expect(entry.description).not.toBe('');
    }
  });
});

describe('PROJECTS_DATA', () => {
  it('has unique ids', () => {
    const ids = PROJECTS_DATA.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('describes each project with technologies, features and an image', () => {
    for (const project of PROJECTS_DATA) {
      expect(project.title).not.toBe('');
      expect(project.description).not.toBe('');
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.features.length).toBeGreaterThan(0);
      expect(isHttpUrl(project.image)).toBe(true);
    }
  });

  it('uses absolute urls for github and live links', () => {
    for (const project of PROJECTS_DATA) {
      expect(isHttpUrl(project.github)).toBe(true);
      expect(isHttpUrl(project.live)).toBe(true);
    }
  });

  it('labels every project stat', () => {
    for (const project of PROJECTS_DATA) {
      for (const stat of project.stats) {
        expect(stat.label).not.toBe('');
        expect(stat.value).not.toBe('');
      }
    }
  });
});

describe('INTERESTS_DATA', () => {
  it('has unique ids', () => {
    const ids = INTERESTS_DATA.map((interest) => interest.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every interest a title, icon and description', () => {
    for (const interest of INTERESTS_DATA) {
      expect(interest.title).not.toBe('');
      expect(interest.icon).not.toBe('');
      expect(interest.description).not.toBe('');
    }
  });
});
