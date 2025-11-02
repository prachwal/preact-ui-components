# SCSS Usage Guide

This guide explains how to use and extend the SCSS system in the Preact UI Components library.

## Overview

The library uses SCSS (Sass) for enhanced CSS with features like:
- Variables and CSS custom properties
- Nesting for better organization
- Mixins for reusable patterns
- Media queries for responsive design

## File Structure

```
src/styles/
├── index.scss       # Main stylesheet with all styles
└── index.scss.d.ts  # TypeScript declarations for SCSS modules
```

## CSS Custom Properties

The design system is built on CSS custom properties (CSS variables) for runtime theme switching.

### Using Color Variables

Always use CSS custom properties for colors to ensure theme compatibility:

```scss
// ✅ Good - Uses design system colors
.my-component {
  color: var(--color-text-dark);
  background-color: var(--color-bg-light);
  border-color: var(--color-border);
}

// ❌ Bad - Hard-coded colors
.my-component {
  color: #000;
  background-color: #fff;
  border-color: #ccc;
}
```

### Available Color Variables

#### Primary Colors
```scss
var(--color-primary)        // Main brand color
var(--color-primary-hover)  // Hover state
var(--color-primary-light)  // Light variant
var(--color-primary-alpha)  // Semi-transparent
var(--color-accent)         // Accent color
var(--color-preact)         // Preact brand color
```

#### Backgrounds
```scss
var(--color-bg-dark)              // Main background
var(--color-bg-light)             // Secondary background
var(--color-button-bg-dark)       // Button background
var(--color-button-bg-dark-hover) // Button hover state
var(--color-button-bg-light)      // Light button variant
```

#### Text Colors
```scss
var(--color-text-dark)      // Primary text
var(--color-text-light)     // Secondary text
var(--color-text-secondary) // Tertiary text
var(--color-muted)          // Muted text
```

#### Status Colors
```scss
var(--color-success-bg)    // Success background
var(--color-success-text)  // Success text
var(--color-info)          // Information color
```

#### Borders & Shadows
```scss
var(--color-border)        // Standard border
var(--color-shadow)        // Standard shadow
var(--color-button-border) // Button border
```

## SCSS Nesting

Use nesting to organize related styles:

```scss
.component {
  display: flex;
  padding: 1rem;
  
  // Element
  &__header {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  // Modifier
  &--large {
    padding: 2rem;
  }
  
  // State
  &:hover {
    background-color: var(--color-bg-light);
  }
  
  // Media query
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
}
```

### Nesting Best Practices

1. **Keep nesting shallow** (max 3 levels)
2. **Use BEM naming** for clarity
3. **Group related selectors** together
4. **Put media queries** at the end

## BEM Naming Convention

Use BEM (Block, Element, Modifier) for component classes:

```scss
// Block
.component {
  display: block;
}

// Element (part of block)
.component__header {
  font-weight: bold;
}

.component__body {
  padding: 1rem;
}

// Modifier (variant of block or element)
.component--large {
  font-size: 1.5rem;
}

.component__header--highlighted {
  color: var(--color-primary);
}
```

### BEM with SCSS Nesting

```scss
.component {
  display: block;
  
  &__header {
    font-weight: bold;
    
    &--highlighted {
      color: var(--color-primary);
    }
  }
  
  &__body {
    padding: 1rem;
  }
  
  &--large {
    font-size: 1.5rem;
  }
}
```

## Responsive Design

Use mobile-first approach with min-width media queries:

```scss
.component {
  // Mobile styles (default)
  padding: 1rem;
  font-size: 14px;
  
  // Tablet and up
  @media (min-width: 768px) {
    padding: 1.5rem;
    font-size: 15px;
  }
  
  // Desktop and up
  @media (min-width: 1024px) {
    padding: 2rem;
    font-size: 16px;
  }
}
```

### Fluid Typography

Use `clamp()` for responsive text sizing:

```scss
h1 {
  // min, preferred, max
  font-size: clamp(2rem, 5vw, 3.2rem);
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
}
```

## Theme Support

### Dark Mode (Default)

Default styles target dark mode:

```scss
:root {
  --color-bg-dark: oklch(18% 0.015 240);
  --color-text-dark: oklch(92% 0.01 220);
}
```

### Light Mode

Override colors in `prefers-color-scheme: light` media query:

```scss
@media (prefers-color-scheme: light) {
  :root {
    --color-bg-dark: oklch(97% 0.005 240);
    --color-text-dark: oklch(20% 0.02 230);
  }
}
```

### Adding Theme-Specific Styles

```scss
.component {
  // Works in both themes
  background-color: var(--color-bg-dark);
  
  // Light mode specific
  @media (prefers-color-scheme: light) {
    border: 1px solid var(--color-border);
  }
}
```

## Common Patterns

### Button Styles

```scss
.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-button-border);
  border-radius: 8px;
  background-color: var(--color-button-bg-dark);
  color: var(--color-text-dark);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-shadow);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--primary {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
    }
  }
}
```

### Card Pattern

```scss
.card {
  padding: 1.5rem;
  background-color: var(--color-bg-light);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
  
  &__header {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  &__body {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
  }
}
```

### Focus States

```scss
.interactive-element {
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }
}
```

### Hover Effects

```scss
.hoverable {
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-shadow);
  }
}
```

## OKLCH Color Space

The design system uses OKLCH for better color perception:

```scss
// OKLCH syntax: oklch(lightness% chroma hue / alpha)
--color-primary: oklch(55% 0.2 240);

// Lightness: 0-100% (brightness)
// Chroma: 0-0.4 (saturation)
// Hue: 0-360 (color wheel)
// Alpha: 0-100% (transparency)
```

### Creating OKLCH Colors

```scss
// Blue with medium lightness and saturation
--color-blue: oklch(55% 0.2 240);

// Lighter variant (increase lightness)
--color-blue-light: oklch(70% 0.15 240);

// More saturated (increase chroma)
--color-blue-vibrant: oklch(55% 0.25 240);

// Semi-transparent
--color-blue-alpha: oklch(55% 0.2 240 / 70%);
```

## Transitions

### Standard Transitions

```scss
.element {
  transition: all 0.2s ease;
}

// Or specific properties
.element {
  transition: 
    transform 0.2s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}
```

### Animation Best Practices

1. **Use CSS transforms** instead of animating layout properties
2. **Prefer opacity changes** over visibility
3. **Keep duration short** (0.2-0.3s)
4. **Use ease or ease-out** timing functions

## Accessibility

### Focus Indicators

Always provide visible focus indicators:

```scss
.button {
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
```

### Color Contrast

Ensure sufficient contrast ratios:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

Use design system colors which are pre-tested for contrast.

### Reduced Motion

Respect user preferences:

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Build Process

### Development

SCSS is automatically compiled by Vite during development:

```bash
npm run dev
```

### Production

Build CSS from SCSS:

```bash
npm run build:css
```

This compiles `src/styles/index.scss` to `lib/styles/styles.css`.

## Extending the System

### Adding New Colors

1. Add to dark theme defaults:

```scss
:root {
  --color-new: oklch(55% 0.2 180);
}
```

2. Add light theme override:

```scss
@media (prefers-color-scheme: light) {
  :root {
    --color-new: oklch(45% 0.2 180);
  }
}
```

### Adding New Components

1. Add styles to `src/styles/index.scss`
2. Use BEM naming convention
3. Use design system variables
4. Include responsive styles
5. Add accessibility features

Example:

```scss
// New component
.new-component {
  display: flex;
  padding: 1rem;
  background-color: var(--color-bg-light);
  border-radius: 8px;
  
  &__header {
    font-weight: bold;
    color: var(--color-text-dark);
  }
  
  &__body {
    color: var(--color-text-secondary);
  }
  
  &--variant {
    background-color: var(--color-primary);
    color: white;
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
}
```

## Common Mistakes to Avoid

### ❌ Hard-coded Colors

```scss
// Don't do this
.component {
  color: #000;
  background: #fff;
}
```

### ✅ Use CSS Variables

```scss
// Do this instead
.component {
  color: var(--color-text-dark);
  background: var(--color-bg-light);
}
```

### ❌ Deep Nesting

```scss
// Too deep
.component {
  .element {
    .subelement {
      .part {
        // 4 levels deep!
      }
    }
  }
}
```

### ✅ Flat BEM Structure

```scss
// Better
.component {
  &__element {
    // 2 levels max
  }
  
  &__subelement {
    // Separate
  }
}
```

### ❌ Vendor Prefixes

```scss
// Not needed (autoprefixer handles this)
.component {
  -webkit-transform: translateX(0);
  -ms-transform: translateX(0);
  transform: translateX(0);
}
```

### ✅ Let Build Tools Handle It

```scss
// Just write standard CSS
.component {
  transform: translateX(0);
}
```

## Testing SCSS Changes

1. **Visual testing** in Storybook
2. **Test both themes** (light and dark)
3. **Check responsive behavior** at different breakpoints
4. **Verify accessibility** (contrast, focus states)
5. **Test in multiple browsers**

## Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [OKLCH Color Picker](https://oklch.com/)
- [BEM Methodology](https://getbem.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [clamp() Function](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
