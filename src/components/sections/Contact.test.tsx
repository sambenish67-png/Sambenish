import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, screen } from '@testing-library/react';
import Contact from '@/components/sections/Contact';
import { PORTFOLIO_DATA } from '@/utils/data';
import { renderWithTheme } from '@/test/renderWithTheme';

const SUBMIT_DELAY = 1500;
const RESET_DELAY = 3000;

const fillForm = () => {
  fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Ada' } });
  fireEvent.change(screen.getByLabelText('Your Email'), {
    target: { value: 'ada@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });
};

const submit = () => {
  fireEvent.click(screen.getByRole('button', { name: /Send Message/ }));
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Contact', () => {
  it('renders the section heading and copy', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByRole('heading', { level: 2, name: 'Get In Touch' })).toBeInTheDocument();
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Contact Information' })
    ).toBeInTheDocument();
  });

  it('lists email, phone and location from the portfolio data', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByText(PORTFOLIO_DATA.email)).toBeInTheDocument();
    expect(screen.getByText(PORTFOLIO_DATA.phone)).toBeInTheDocument();
    expect(screen.getByText(PORTFOLIO_DATA.location)).toBeInTheDocument();
  });

  it('links the email and phone entries with the right protocols', () => {
    renderWithTheme(<Contact />);

    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain(`mailto:${PORTFOLIO_DATA.email}`);
    expect(hrefs).toContain(`tel:${PORTFOLIO_DATA.phone}`);
    expect(hrefs).toContain(PORTFOLIO_DATA.linkedin);
    expect(hrefs).toContain(PORTFOLIO_DATA.github);
  });

  it('falls back to "#" for entries without a link', () => {
    renderWithTheme(<Contact />);

    const locationLink = screen.getByText(PORTFOLIO_DATA.location).closest('a');
    expect(locationLink).toHaveAttribute('href', '#');
  });

  it('records what the visitor types', () => {
    renderWithTheme(<Contact />);

    fillForm();

    expect(screen.getByLabelText('Your Name')).toHaveValue('Ada');
    expect(screen.getByLabelText('Your Email')).toHaveValue('ada@example.com');
    expect(screen.getByLabelText('Message')).toHaveValue('Hello there');
  });

  it('requires every field', () => {
    renderWithTheme(<Contact />);

    expect(screen.getByLabelText('Your Name')).toBeRequired();
    expect(screen.getByLabelText('Your Email')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('shows a loading state while submitting', () => {
    renderWithTheme(<Contact />);
    fillForm();

    submit();

    expect(screen.getByRole('button', { name: /Send Message/ })).toBeDisabled();
  });

  it('confirms submission, clears the form and resets afterwards', () => {
    renderWithTheme(<Contact />);
    fillForm();
    submit();

    act(() => {
      vi.advanceTimersByTime(SUBMIT_DELAY);
    });

    expect(screen.getByText(/Thanks for reaching out/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Message Sent/ })).toBeDisabled();
    expect(screen.getByLabelText('Your Name')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');

    act(() => {
      vi.advanceTimersByTime(RESET_DELAY);
    });

    expect(screen.queryByText(/Thanks for reaching out/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/ })).toBeEnabled();
  });

  it('hides the success message before any submission', () => {
    renderWithTheme(<Contact />);

    expect(screen.queryByText(/Thanks for reaching out/)).not.toBeInTheDocument();
  });

  it('themes the section background', () => {
    const dark = renderWithTheme(<Contact />, { theme: 'dark' });
    expect(dark.container.querySelector('#contact')?.className).toContain('bg-slate-900');
    dark.unmount();

    const light = renderWithTheme(<Contact />, { theme: 'light' });
    expect(light.container.querySelector('#contact')?.className).toContain('bg-white');
  });
});
