# Design System

This document describes the design system used in the Preact UI Components library.

## Overview

The design system is built on SCSS with CSS custom properties, providing a consistent and maintainable approach to styling. It features automatic light/dark theme support through the `prefers-color-scheme` media query.

## Color System

All colors use the **OKLCH color space** for perceptual uniformity and better interpolation compared to traditional RGB or HSL.

### Primary Colors

- `--color-primary`: Main brand color (oklch(55% 0.2 240) dark / oklch(48% 0.2 240) light)
- `--color-primary-hover`: Hover state for primary color
- `--color-primary-light`: Lighter variant of primary color
- `--color-primary-alpha`: Semi-transparent primary color
- `--color-accent`: Accent color (same as primary by default)
- `--color-preact`: Preact brand color (purple)

### Background Colors

- `--color-bg-dark`: Main background color
- `--color-bg-light`: Secondary background color (slightly lighter)
- `--color-button-bg-dark`: Button background in default state
- `--color-button-bg-dark-hover`: Button background on hover
- `--color-button-bg-light`: Light button background variant

### Text Colors

- `--color-text-dark`: Primary text color
- `--color-text-light`: Secondary text color
- `--color-text-secondary`: Tertiary text color (muted)
- `--color-muted`: Very muted text for less important content

### Status Colors

- `--color-success-bg`: Success state background
- `--color-success-text`: Success state text
- `--color-info`: Information state color

### Borders & Shadows

- `--color-border`: Standard border color
- `--color-shadow`: Standard shadow color
- `--color-button-border`: Button border color

## Theme Support

The design system automatically adapts to light and dark themes using the `prefers-color-scheme` media query.

### Dark Theme (Default)
- Dark backgrounds (oklch 18-28% lightness)
- Light text (oklch 92% lightness)
- High contrast for readability

### Light Theme
- Light backgrounds (oklch 92-99% lightness)
- Dark text (oklch 20% lightness)
- Adjusted contrast for comfortable reading

### Custom Theme Implementation

To add custom theme support:

```scss
@media (prefers-color-scheme: light) {
  :root {
    --color-primary: oklch(48% 0.2 240);
    // ... other color overrides
  }
}
```

## Typography

### Font Stack

System fonts for optimal performance and native feel:

```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

### Fluid Typography

Uses `clamp()` for responsive text sizing:

- `h1`: `clamp(2rem, 5vw, 3.2rem)`
- `h2`: `clamp(1.5rem, 4vw, 2rem)`

### Font Weights

- Regular: 400
- Medium: 500
- Bold: 700

## Spacing System

Consistent spacing scale based on rem units:

- Micro: `0.25rem` (4px)
- Small: `0.5rem` (8px)
- Medium: `0.75rem` (12px)
- Base: `1rem` (16px)
- Large: `1.5rem` (24px)
- XL: `2rem` (32px)
- XXL: `3rem` (48px)

## Border Radius

Standard values for consistent component styling:

- Focus outline: `2px`
- Small (code): `4px`
- Medium (cards, buttons): `8px`
- Pill (buttons): `3em`

## Transitions & Animations

### Standard Transition

```css
transition: all 0.2s ease;
```

Used for:
- Button states
- Link hover effects
- Interactive elements

### Filter Transition

```css
transition: filter 0.3s ease;
```

Used for:
- Logo hover effects
- Image effects

### Interaction Feedback

All interactive elements provide visual feedback:

- **Hover**: `translateY(-2px)` + box-shadow
- **Active**: `translateY(0)` for click feedback
- **Focus**: `2px solid outline` with `2px offset`
- **Disabled**: `opacity: 0.5` + `cursor: not-allowed`

## Component Patterns

### Button Variants

1. **Primary**: Bold, filled background with accent color
2. **Secondary**: Subtle, outlined with transparent background

### Card Pattern

```scss
.card {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--color-bg-light);
}
```

### Focus States

All interactive elements include accessible focus states:

```scss
&:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## Accessibility

### WCAG 2.1 Level AA Compliance

- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- All interactive elements have focus indicators
- Color is not the only means of conveying information

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Clear focus indicators on all focusable elements
- Logical tab order

## Responsive Design

### Mobile-First Approach

Breakpoints:
- Mobile: Default (< 768px)
- Tablet: `@media (min-width: 768px)`
- Desktop: Handled by fluid typography and spacing

### Fluid Layouts

- Use `max-width` with percentage-based widths
- Flexible gaps with flexbox/grid
- Responsive padding with `clamp()`

## Best Practices

### Using CSS Custom Properties

Always use CSS custom properties for colors:

```scss
// ✅ Good
color: var(--color-text-dark);

// ❌ Bad
color: #000;
```

### SCSS Nesting

Keep nesting shallow (max 3 levels):

```scss
.component {
  &__element {
    &--modifier {
      // Max depth
    }
  }
}
```

### BEM Naming Convention

Use BEM for component classes:

```scss
.component          // Block
.component__element // Element
.component--modifier // Modifier
```

## Future Enhancements

- [ ] CSS Grid layout system
- [ ] More granular spacing utilities
- [ ] Extended color palette with semantic colors
- [ ] Animation system with keyframes
- [ ] Dark mode toggle (manual override)
