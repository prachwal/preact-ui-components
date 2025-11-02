import { fireEvent, render, screen } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { Header, type HeaderProps } from '.';

describe('Header', () => {
  const defaultProps: HeaderProps = {
    onLogin: vi.fn(),
    onLogout: vi.fn(),
    onCreateAccount: vi.fn(),
  };

  it('renders with logo and title', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByLabelText('Acme Logo')).toBeInTheDocument();
  });

  it('renders login and signup buttons when logged out', () => {
    render(<Header {...defaultProps} user={null} />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders welcome message and logout button when logged in', () => {
    const user = { name: 'John Doe' };
    render(<Header {...defaultProps} user={user} />);
    expect(screen.getByLabelText(`Logged in as ${user.name}`)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('calls onLogin when login button is clicked', () => {
    const onLogin = vi.fn();
    render(<Header {...defaultProps} onLogin={onLogin} user={null} />);
    
    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);
    
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it('calls onCreateAccount when signup button is clicked', () => {
    const onCreateAccount = vi.fn();
    render(<Header {...defaultProps} onCreateAccount={onCreateAccount} user={null} />);
    
    const signupButton = screen.getByText('Sign up');
    fireEvent.click(signupButton);
    
    expect(onCreateAccount).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout when logout button is clicked', () => {
    const onLogout = vi.fn();
    const user = { name: 'John Doe' };
    render(<Header {...defaultProps} onLogout={onLogout} user={user} />);
    
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);
    
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Header {...defaultProps} />);
    const header = container.querySelector('.header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });
});
