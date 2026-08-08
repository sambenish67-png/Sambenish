import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Button';
import { renderWithTheme } from '@/test/renderWithTheme';

describe('Button', () => {
  it('renders its children inside a button element', () => {
    renderWithTheme(<Button>Hire me</Button>);

    expect(screen.getByRole('button', { name: 'Hire me' })).toBeInTheDocument();
  });

  it('calls onClick when pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<Button onClick={onClick}>Send</Button>);

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick while disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <Button onClick={onClick} disabled>
        Send
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).toBeDisabled();
    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('disables itself and shows a spinner while loading', () => {
    renderWithTheme(<Button isLoading>Send</Button>);

    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).toBeDisabled();
    expect(button.querySelector('.animate-spin')).not.toBeNull();
  });

  it('omits the spinner when not loading', () => {
    renderWithTheme(<Button>Send</Button>);

    expect(screen.getByRole('button').querySelector('.animate-spin')).toBeNull();
  });

  it.each([
    ['sm', 'px-4'],
    ['md', 'px-6'],
    ['lg', 'px-8'],
  ] as const)('applies %s size styles', (size, expectedClass) => {
    renderWithTheme(<Button size={size}>Sized</Button>);

    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it('defaults to the medium primary variant', () => {
    renderWithTheme(<Button>Default</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('bg-gradient-aurora');
  });

  it('applies the outline variant styles', () => {
    renderWithTheme(<Button variant="outline">Outlined</Button>);

    expect(screen.getByRole('button')).toHaveClass('border-cyan-400');
  });

  it('themes the secondary variant per mode', () => {
    const dark = renderWithTheme(<Button variant="secondary">Secondary</Button>, {
      theme: 'dark',
    });
    expect(screen.getByRole('button')).toHaveClass('bg-slate-800');
    dark.unmount();

    renderWithTheme(<Button variant="secondary">Secondary</Button>, { theme: 'light' });
    expect(screen.getByRole('button')).toHaveClass('bg-slate-200');
  });

  it('renders an anchor with href when as="a"', () => {
    renderWithTheme(
      <Button as="a" href="https://example.com" target="_blank" rel="noreferrer">
        Resume
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Resume' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('forwards additional button attributes', () => {
    renderWithTheme(
      <Button type="submit" aria-label="submit form">
        Submit
      </Button>
    );

    const button = screen.getByRole('button', { name: 'submit form' });
    expect(button).toHaveAttribute('type', 'submit');
  });
});
