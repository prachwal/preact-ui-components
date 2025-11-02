import type { Meta, StoryObj } from '@storybook/preact';

const meta = {
  title: 'Design System/SCSS System',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({ name, variable }: { name: string; variable: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '0.75rem',
    }}
  >
    <div
      style={{
        width: '80px',
        height: '40px',
        backgroundColor: `var(${variable})`,
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</div>
      <code style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
        {variable}
      </code>
    </div>
  </div>
);

const TypographyExample = ({ tag, children }: { tag: string; children: string }) => {
  const Tag = tag as keyof JSX.IntrinsicElements;
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Tag>{children}</Tag>
      <code
        style={{
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          display: 'block',
          marginTop: '0.25rem',
        }}
      >
        {`<${tag}>`}
      </code>
    </div>
  );
};

export const ColorPalette: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Color System</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        All colors use OKLCH color space for perceptual uniformity and automatically adapt to light/dark themes via CSS custom properties.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Primary Colors</h2>
          <ColorSwatch name="Primary" variable="--color-primary" />
          <ColorSwatch name="Primary Hover" variable="--color-primary-hover" />
          <ColorSwatch name="Primary Light" variable="--color-primary-light" />
          <ColorSwatch name="Primary Alpha" variable="--color-primary-alpha" />
          <ColorSwatch name="Accent" variable="--color-accent" />
          <ColorSwatch name="Preact" variable="--color-preact" />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Background Colors</h2>
          <ColorSwatch name="Background Dark" variable="--color-bg-dark" />
          <ColorSwatch name="Background Light" variable="--color-bg-light" />
          <ColorSwatch name="Button Background Dark" variable="--color-button-bg-dark" />
          <ColorSwatch name="Button Background Light" variable="--color-button-bg-light" />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Text Colors</h2>
          <ColorSwatch name="Text Dark" variable="--color-text-dark" />
          <ColorSwatch name="Text Light" variable="--color-text-light" />
          <ColorSwatch name="Text Secondary" variable="--color-text-secondary" />
          <ColorSwatch name="Muted" variable="--color-muted" />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Status Colors</h2>
          <ColorSwatch name="Success Background" variable="--color-success-bg" />
          <ColorSwatch name="Success Text" variable="--color-success-text" />
          <ColorSwatch name="Info" variable="--color-info" />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Borders & Shadows</h2>
          <ColorSwatch name="Border" variable="--color-border" />
          <ColorSwatch name="Shadow" variable="--color-shadow" />
          <ColorSwatch name="Button Border" variable="--color-button-border" />
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Typography System</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Fluid typography using clamp() functions for responsive scaling.
      </p>

      <TypographyExample tag="h1">Heading 1 - clamp(2rem, 5vw, 3.2rem)</TypographyExample>
      <TypographyExample tag="h2">Heading 2 - clamp(1.5rem, 4vw, 2rem)</TypographyExample>
      
      <p style={{ marginBottom: '1rem' }}>
        Body text uses system fonts for optimal performance and native feel:
        system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
      </p>

      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Secondary text is slightly smaller and uses muted colors for hierarchy.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <code style={{
          display: 'block',
          padding: '1rem',
          backgroundColor: 'var(--color-button-bg-dark)',
          borderRadius: '4px',
          fontFamily: '"Courier New", monospace',
        }}>
          Code blocks use monospace fonts with background highlighting
        </code>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Spacing System</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Consistent spacing scale used throughout the component library.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { size: '0.25rem', label: '4px - Micro spacing' },
          { size: '0.5rem', label: '8px - Small spacing' },
          { size: '0.75rem', label: '12px - Medium spacing' },
          { size: '1rem', label: '16px - Base spacing' },
          { size: '1.5rem', label: '24px - Large spacing' },
          { size: '2rem', label: '32px - XL spacing' },
          { size: '3rem', label: '48px - XXL spacing' },
        ].map(({ size, label }) => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: size,
                height: '24px',
                backgroundColor: 'var(--color-primary)',
                borderRadius: '2px',
              }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Border Radius System</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Standard border radius values for consistent component styling.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
        {[
          { radius: '2px', label: 'Focus Outline' },
          { radius: '4px', label: 'Small (Code)' },
          { radius: '8px', label: 'Medium (Cards, Buttons)' },
          { radius: '3em', label: 'Pill (Button)' },
        ].map(({ radius, label }) => (
          <div key={radius} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 0.5rem',
                backgroundColor: 'var(--color-primary)',
                borderRadius: radius,
              }}
            />
            <div style={{ fontWeight: 'bold' }}>{radius}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Transitions: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Transitions & Animations</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Smooth, consistent transitions enhance the user experience.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Standard Transition (0.2s ease)</h3>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px var(--color-shadow)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Hover Me
          </button>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
            Used for buttons, links, and interactive elements
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Filter Transition (0.3s ease)</h3>
          <img
            src="https://vitejs.dev/logo.svg"
            alt="Logo"
            style={{
              height: '60px',
              transition: 'filter 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLImageElement).style.filter = 'drop-shadow(0 0 2em var(--color-primary-alpha))';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLImageElement).style.filter = 'none';
            }}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
            Used for logo effects and hover states
          </p>
        </div>
      </div>
    </div>
  ),
};

export const AllComponents: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Complete SCSS System Demo</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          This demo showcases the entire design system with all components, colors, and interactive states.
          Use the theme switcher in the toolbar to test light and dark modes.
        </p>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Buttons */}
          <section style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Buttons</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="button button--primary button--small">Small Primary</button>
              <button className="button button--primary button--medium">Medium Primary</button>
              <button className="button button--primary button--large">Large Primary</button>
              <button className="button button--secondary button--medium">Secondary</button>
              <button className="button button--medium" disabled>Disabled</button>
            </div>
          </section>

          {/* Cards */}
          <section style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Cards</h2>
            <div className="card">
              <h3 style={{ margin: '0 0 0.5rem' }}>Card Title</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                Cards provide a container for related content with consistent padding and background.
              </p>
              <code>const example = 'code snippet';</code>
            </div>
          </section>

          {/* Typography */}
          <section style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Typography</h2>
            <h1>Heading 1 - Responsive</h1>
            <h2>Heading 2 - Responsive</h2>
            <p>
              This is body text with <a href="#" style={{ color: 'var(--color-primary)' }}>a link</a> that
              demonstrates the color system and typography hierarchy.
            </p>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Secondary text in a muted color for less important information.
            </p>
          </section>

          {/* Status & Info */}
          <section style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Status & Info Elements</h2>
            <div className="page">
              <div className="tip-wrapper">
                <span className="tip">TIP</span>
                This demonstrates the tip/info styling with appropriate colors and borders.
              </div>
            </div>
          </section>

          {/* Interactive States */}
          <section style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-light)', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Interactive States</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
              All interactive elements have consistent hover, focus, and active states:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Hover: translateY(-2px) + box-shadow</li>
              <li>Focus: 2px outline with offset</li>
              <li>Active: translateY(0) for click feedback</li>
              <li>Disabled: opacity 0.5 + not-allowed cursor</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  ),
};
