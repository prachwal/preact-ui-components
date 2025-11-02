import { render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';
import { Page, StorybookContent } from '.';

describe('Page', () => {
  it('renders page wrapper with header', () => {
    render(
      <Page>
        <h1>Test Content</h1>
      </Page>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Header component within Page', () => {
    render(<Page><div>Content</div></Page>);
    expect(screen.getByText('Acme')).toBeInTheDocument();
  });

  it('applies correct CSS class to section', () => {
    const { container } = render(<Page><div>Content</div></Page>);
    const section = container.querySelector('.page');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('page');
  });

  it('passes children to section', () => {
    render(
      <Page>
        <div data-testid="child-content">Child Content</div>
      </Page>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('wraps content in article tag', () => {
    const { container } = render(<Page><div>Content</div></Page>);
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });
});

describe('StorybookContent', () => {
  it('renders page title', () => {
    render(<StorybookContent />);
    expect(screen.getByText('Pages in Storybook')).toBeInTheDocument();
  });

  it('renders tip about pages', () => {
    render(<StorybookContent />);
    expect(screen.getByText('Tip')).toBeInTheDocument();
  });

  it('renders list of page features', () => {
    render(<StorybookContent />);
    expect(screen.getByText(/Use a higher-level connected component/i)).toBeInTheDocument();
    expect(screen.getByText(/Assemble data in the page component/i)).toBeInTheDocument();
  });

  it('contains external link to component-driven.org', () => {
    render(<StorybookContent />);
    const link = screen.getByText('component-driven').closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://componentdriven.org');
  });

  it('contains external link to Storybook tutorials', () => {
    render(<StorybookContent />);
    const link = screen.getByText('Storybook tutorials').closest('a');
    expect(link).toBeInTheDocument();
    expect(link?.getAttribute('href')).toContain('storybook');
  });

  it('renders tip-wrapper section', () => {
    const { container } = render(<StorybookContent />);
    const tipWrapper = container.querySelector('.tip-wrapper');
    expect(tipWrapper).toBeInTheDocument();
  });

  it('contains informational icon in tip', () => {
    const { container } = render(<StorybookContent />);
    const svg = container.querySelector('.tip-wrapper svg');
    expect(svg).toBeInTheDocument();
  });
});
