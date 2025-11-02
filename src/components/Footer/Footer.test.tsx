import { render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import { Footer } from '.';

describe('Footer', () => {
  it('renders build status section', () => {
    render(<Footer />);
    expect(screen.getByText(/Build Status/i)).toBeInTheDocument();
  });

  it('renders storybook build icon', () => {
    render(<Footer />);
    const storybookLink = screen.getByLabelText('Open Storybook');
    expect(storybookLink).toBeInTheDocument();
    expect(storybookLink).toHaveAttribute('title', 'Storybook');
  });

  it('renders docs build icon', () => {
    render(<Footer />);
    const docsLink = screen.getByLabelText('Open Documentation');
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute('title', 'Documentation');
  });

  it('renders test coverage icon', () => {
    render(<Footer />);
    const coverageLink = screen.getByLabelText('Open Coverage Report');
    expect(coverageLink).toBeInTheDocument();
    expect(coverageLink).toHaveAttribute('title', 'Test Coverage');
  });

  it('renders app version', () => {
    render(<Footer />);
    const versionElement = screen.getByText(/v\d+\.\d+\.\d+/);
    expect(versionElement).toBeInTheDocument();
    expect(versionElement).toHaveClass('app-version');
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('.app-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('app-footer');
  });

  it('renders build icons with correct styling', () => {
    const { container } = render(<Footer />);
    const buildIcons = container.querySelectorAll('.build-icon');
    expect(buildIcons.length).toBeGreaterThan(0);

    buildIcons.forEach(icon => {
      expect(icon).toHaveClass('build-icon');
      expect(
        icon.classList.contains('enabled') ||
          icon.classList.contains('disabled')
      ).toBe(true);
    });
  });

  it('contains footer content wrapper', () => {
    const { container } = render(<Footer />);
    const footerContent = container.querySelector('.footer-content');
    expect(footerContent).toBeInTheDocument();
  });

  it('renders footer with contentinfo role', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
