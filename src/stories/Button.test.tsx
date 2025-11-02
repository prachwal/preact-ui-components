import { fireEvent, render, screen } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import type { ButtonProps } from './Button';
import { Button } from './Button';

describe('Button', () => {
  const defaultProps: ButtonProps = {
    label: 'Click me',
  };

  it('renders with default props', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button', 'button--medium', 'button--secondary');
  });

  it('renders with primary variant', () => {
    render(<Button {...defaultProps} primary />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('button--primary');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button {...defaultProps} size='small' />);
    expect(screen.getByRole('button')).toHaveClass('button--small');

    rerender(<Button {...defaultProps} size='large' />);
    expect(screen.getByRole('button')).toHaveClass('button--large');
  });

  it('applies custom background color', () => {
    render(<Button {...defaultProps} backgroundColor='#ff0000' />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes through additional props', () => {
    render(<Button {...defaultProps} data-testid='custom-button' disabled />);
    const button = screen.getByTestId('custom-button');
    expect(button).toBeDisabled();
  });
});
