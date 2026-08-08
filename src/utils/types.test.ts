import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  animationVariants,
  formatDate,
  getYearsSince,
  scrollToElement,
} from '@/utils/types';

afterEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('scrollToElement', () => {
  it('smooth-scrolls the element with the given id into view', () => {
    const element = document.createElement('div');
    element.id = 'projects';
    const scrollIntoView = vi.fn();
    element.scrollIntoView = scrollIntoView;
    document.body.appendChild(element);

    scrollToElement('projects');

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('does nothing when no element matches the id', () => {
    expect(() => scrollToElement('missing')).not.toThrow();
  });
});

describe('formatDate', () => {
  it('formats a date as month and year', () => {
    expect(formatDate(new Date('2024-03-15T00:00:00Z'))).toBe('March 2024');
  });

  it('formats dates in other years', () => {
    expect(formatDate(new Date('1999-12-01T12:00:00Z'))).toBe('December 1999');
  });
});

describe('getYearsSince', () => {
  it('returns whole years elapsed since the given date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));

    expect(getYearsSince(new Date('2020-01-01T00:00:00Z'))).toBe(4);
    expect(getYearsSince(new Date('2019-06-01T00:00:00Z'))).toBe(4);
  });

  it('returns 0 for the current moment', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));

    expect(getYearsSince(new Date('2024-01-01T00:00:00Z'))).toBe(0);
  });

  it('returns a negative value for future dates', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));

    expect(getYearsSince(new Date('2026-01-01T00:00:00Z'))).toBeLessThan(0);
  });
});

describe('animationVariants', () => {
  it('defines hidden and visible states for each entrance variant', () => {
    const entranceVariants = [
      'container',
      'item',
      'fadeInUp',
      'fadeInLeft',
      'fadeInRight',
      'scaleIn',
    ] as const;

    for (const name of entranceVariants) {
      const variant = animationVariants[name];
      expect(variant).toHaveProperty('hidden');
      expect(variant.visible).toMatchObject({ opacity: 1 });
    }
  });

  it('starts hidden variants fully transparent', () => {
    expect(animationVariants.fadeInUp.hidden).toMatchObject({ opacity: 0, y: 30 });
    expect(animationVariants.fadeInLeft.hidden).toMatchObject({ opacity: 0, x: -30 });
    expect(animationVariants.fadeInRight.hidden).toMatchObject({ opacity: 0, x: 30 });
    expect(animationVariants.scaleIn.hidden).toMatchObject({ opacity: 0, scale: 0.9 });
  });

  it('scales up on hover', () => {
    expect(animationVariants.hover.scale).toBeGreaterThan(1);
  });
});
