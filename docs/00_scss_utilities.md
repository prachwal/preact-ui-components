# 00. System Narzędzi (Utilities)

## Architektura Systemu Narzędzi

System narzędzi zapewnia kompletny zestaw mixinów, funkcji i klas utility do efektywnego tworzenia komponentów. Wszystkie narzędzia są zorganizowane w moduły funkcjonalne z jasnymi odpowiedzialnościami.

### Kluczowe Funkcjonalności

- **Modularna Organizacja**: Narzędzia podzielone na kategorie funkcjonalne
- **Type Safety**: TypeScript integration dla funkcji SCSS
- **Performance**: Optymalizowane mixiny dla lepszej wydajności CSS
- **Responsywność**: Wbudowane narzędzia responsywne
- **Dostępność**: Narzędzia wspierające dostępność

## Funkcje Kolorów

### Manipulacja Kolorami

```scss
// utilities/_color-functions.scss
@use 'sass:color';
@use 'sass:math';

// Lighten color with bounds checking
@function color-lighten($color, $amount) {
  $lightened: color.adjust($color, $lightness: $amount);

  // Ensure we don't exceed 100% lightness
  @if color.lightness($lightened) > 95% {
    @return color.change($color, $lightness: 95%);
  }

  @return $lightened;
}

// Darken color with bounds checking
@function color-darken($color, $amount) {
  $darkened: color.adjust($color, $lightness: -$amount);

  // Ensure we don't go below 5% lightness
  @if color.lightness($darkened) < 5% {
    @return color.change($color, $lightness: 5%);
  }

  @return $darkened;
}

// Calculate contrast ratio
@function contrast-ratio($color1, $color2) {
  $l1: color.lightness($color1) / 100%;
  $l2: color.lightness($color2) / 100%;

  @if $l1 > $l2 {
    @return ($l1 + 0.05) / ($l2 + 0.05);
  } @else {
    @return ($l2 + 0.05) / ($l1 + 0.05);
  }
}

// Check if color has sufficient contrast
@function has-sufficient-contrast($color, $background, $threshold: 4.5) {
  @return contrast-ratio($color, $background) >= $threshold;
}

// Generate accessible text color
@function accessible-text-color($background) {
  $light-contrast: contrast-ratio(#ffffff, $background);
  $dark-contrast: contrast-ratio(#000000, $background);

  @if $light-contrast > $dark-contrast {
    @return #ffffff;
  } @else {
    @return #000000;
  }
}
```

### Generowanie Palet Kolorów

```scss
// Generate color palette from base color
@function generate-color-palette($base-color, $name: 'custom') {
  $palette: ();

  // Generate shades from 50 to 900
  @for $i from 0 through 9 {
    $lightness: (9 - $i) * 10; // 90% to 0%
    $shade: 50 + ($i * 50); // 50, 100, 150, ..., 500, ..., 900

    @if $lightness == 50 {
      // Base color at 500
      $palette: map.set($palette, 500, $base-color);
    } @else if $lightness > 50 {
      // Lighter shades
      $amount: ($lightness - 50) * 0.01;
      $palette: map.set($palette, $shade, color-lighten($base-color, $amount));
    } @else {
      // Darker shades
      $amount: (50 - $lightness) * 0.01;
      $palette: map.set($palette, $shade, color-darken($base-color, $amount));
    }
  }

  @return $palette;
}

// Generate semantic color variants
@function generate-semantic-colors($palette) {
  @return (
    success: map.get($palette, 500),
    success-light: map.get($palette, 100),
    success-dark: map.get($palette, 700),
    warning: #ff9800,
    warning-light: #fff3e0,
    warning-dark: #e65100,
    error: #f44336,
    error-light: #ffebee,
    error-dark: #b71c1c,
    info: #2196f3,
    info-light: #e3f2fd,
    info-dark: #0d47a1
  );
}
```

## Funkcje Responsywności

### Breakpoint System

```scss
// utilities/_responsive.scss
$breakpoints: (
  xs: 0px,
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  '2xl': 1536px,
);

// Get breakpoint value
@function breakpoint($name) {
  @if map.has-key($breakpoints, $name) {
    @return map.get($breakpoints, $name);
  } @else {
    @error 'Breakpoint "#{$name}" not found. Available breakpoints: #{map.keys($breakpoints)}';
  }
}

// Generate media query
@function media-query($breakpoint, $type: min) {
  $value: breakpoint($breakpoint);

  @if $type == min {
    @return '(min-width: #{$value})';
  } @else if $type == max {
    @return '(max-width: #{$value - 1px})';
  } @else {
    @error 'Invalid media query type "#{$type}". Use "min" or "max".';
  }
}
```

### Mixiny Responsywne

```scss
// Responsive property mixin
@mixin responsive-prop($property, $values) {
  $length: length($values);

  @if $length == 1 {
    #{$property}: nth($values, 1);
  } @else if $length == 2 {
    #{$property}: nth($values, 1);

    @media #{media-query(sm)} {
      #{$property}: nth($values, 2);
    }
  } @else if $length == 3 {
    #{$property}: nth($values, 1);

    @media #{media-query(md)} {
      #{$property}: nth($values, 2);
    }

    @media #{media-query(lg)} {
      #{$property}: nth($values, 3);
    }
  } @else if $length == 4 {
    #{$property}: nth($values, 1);

    @media #{media-query(sm)} {
      #{$property}: nth($values, 2);
    }

    @media #{media-query(md)} {
      #{$property}: nth($values, 3);
    }

    @media #{media-query(lg)} {
      #{$property}: nth($values, 4);
    }
  } @else {
    @error 'Too many responsive values. Maximum 4 values allowed.';
  }
}

// Responsive font size
@mixin responsive-text($sizes) {
  @include responsive-prop(font-size, $sizes);
}

// Responsive spacing
@mixin responsive-spacing($property, $values) {
  @include responsive-prop($property, $values);
}
```

## Mixiny Animacji

### Transition System

```scss
// utilities/_animations.scss
$transitions: (
  duration: (
    instant: 0ms,
    fast: 150ms,
    base: 300ms,
    slow: 500ms,
    slower: 700ms,
  ),
  timing: (
    linear: linear,
    ease: ease,
    'ease-in': ease-in,
    'ease-out': ease-out,
    'ease-in-out': ease-in-out,
    bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55),
    smooth: cubic-bezier(0.4, 0, 0.2, 1),
  ),
);

// Get transition value
@function transition-duration($name) {
  @return map.get($transitions, duration, $name);
}

@function transition-timing($name) {
  @return map.get($transitions, timing, $name);
}

// Standard transition mixin
@mixin transition($properties: all, $duration: base, $timing: smooth, $delay: 0ms) {
  $duration-value: if(type-of($duration) == 'string', transition-duration($duration), $duration);
  $timing-value: if(type-of($timing) == 'string', transition-timing($timing), $timing);

  transition: #{$properties} #{$duration-value} #{$timing-value} #{$delay};
}

// Multiple property transitions
@mixin transitions($transitions...) {
  $transition-list: ();

  @each $transition in $transitions {
    $property: nth($transition, 1);
    $duration: if(length($transition) > 1, nth($transition, 2), base);
    $timing: if(length($transition) > 2, nth($transition, 3), smooth);
    $delay: if(length($transition) > 3, nth($transition, 4), 0ms);

    $duration-value: if(type-of($duration) == 'string', transition-duration($duration), $duration);
    $timing-value: if(type-of($timing) == 'string', transition-timing($timing), $timing);

    $transition-list: append(
      $transition-list,
      #{$property} #{$duration-value} #{$timing-value} #{$delay},
      comma
    );
  }

  transition: $transition-list;
}
```

### Keyframe Animations

```scss
// Fade animations
@mixin fade-in($duration: base, $timing: smooth) {
  animation: fade-in #{$duration} #{$timing} forwards;
}

@mixin fade-out($duration: base, $timing: smooth) {
  animation: fade-out #{$duration} #{$timing} forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

// Slide animations
@mixin slide-in($direction: up, $distance: 1rem, $duration: base, $timing: smooth) {
  $transform: translateY($distance);

  @if $direction == down {
    $transform: translateY(-$distance);
  } @else if $direction == left {
    $transform: translateX($distance);
  } @else if $direction == right {
    $transform: translateX(-$distance);
  }

  animation: slide-in-#{$direction} #{$duration} #{$timing} forwards;

  @keyframes slide-in-#{$direction} {
    from {
      opacity: 0;
      transform: #{$transform};
    }
    to {
      opacity: 1;
      transform: translate(0);
    }
  }
}

// Scale animations
@mixin scale-in($scale: 0.8, $duration: base, $timing: smooth) {
  animation: scale-in #{$duration} #{$timing} forwards;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale($scale);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Mixiny Layout

### Flexbox Utilities

```scss
// utilities/_mixins.scss

// Flex container
@mixin flex($direction: row, $wrap: nowrap, $justify: flex-start, $align: stretch, $gap: null) {
  display: flex;
  flex-direction: $direction;
  flex-wrap: $wrap;
  justify-content: $justify;
  align-items: $align;

  @if $gap != null {
    gap: $gap;
  }
}

// Flex item
@mixin flex-item($grow: 0, $shrink: 1, $basis: auto) {
  flex: #{$grow} #{$shrink} #{$basis};
}

// Common flex patterns
@mixin flex-center {
  @include flex(row, nowrap, center, center);
}

@mixin flex-center-column {
  @include flex(column, nowrap, center, center);
}

@mixin flex-space-between {
  @include flex(row, nowrap, space-between, center);
}

@mixin flex-space-around {
  @include flex(row, nowrap, space-around, center);
}
```

### Grid Utilities

```scss
// Grid container
@mixin grid($columns: 1, $rows: auto, $gap: null, $justify: stretch, $align: stretch) {
  display: grid;
  grid-template-columns: $columns;
  grid-template-rows: $rows;
  justify-items: $justify;
  align-items: $align;

  @if $gap != null {
    gap: $gap;
  }
}

// Grid item
@mixin grid-item($column: auto, $row: auto, $area: null) {
  grid-column: $column;
  grid-row: $row;

  @if $area != null {
    grid-area: $area;
  }
}

// Responsive grid
@mixin responsive-grid(
  $columns: (
    1,
    2,
    3,
    4,
  ),
  $gap: 1rem
) {
  @include grid(nth($columns, 1), auto, $gap);

  @media #{media-query(sm)} {
    grid-template-columns: repeat(nth($columns, 2), 1fr);
  }

  @media #{media-query(md)} {
    grid-template-columns: repeat(nth($columns, 3), 1fr);
  }

  @media #{media-query(lg)} {
    grid-template-columns: repeat(nth($columns, 4), 1fr);
  }
}
```

### Spacing Utilities

```scss
// Spacing scale
$spacing-scale: (
  0: 0,
  px: 1px,
  0.5: 0.125rem,
  1: 0.25rem,
  1.5: 0.375rem,
  2: 0.5rem,
  2.5: 0.625rem,
  3: 0.75rem,
  3.5: 0.875rem,
  4: 1rem,
  5: 1.25rem,
  6: 1.5rem,
  7: 1.75rem,
  8: 2rem,
  9: 2.25rem,
  10: 2.5rem,
  11: 2.75rem,
  12: 3rem,
  14: 3.5rem,
  16: 4rem,
  20: 5rem,
  24: 6rem,
  28: 7rem,
  32: 8rem,
  36: 9rem,
  40: 10rem,
  44: 11rem,
  48: 12rem,
  52: 13rem,
  56: 14rem,
  60: 15rem,
  64: 16rem,
  72: 18rem,
  80: 20rem,
  96: 24rem,
);

// Get spacing value
@function spacing($key) {
  @if map.has-key($spacing-scale, $key) {
    @return map.get($spacing-scale, $key);
  } @else {
    @error 'Spacing key "#{$key}" not found. Available keys: #{map.keys($spacing-scale)}';
  }
}

// Spacing mixins
@mixin spacing($property, $size) {
  #{$property}: spacing($size);
}

@mixin margin($size, $direction: null) {
  @if $direction == null {
    margin: spacing($size);
  } @else {
    margin-#{$direction}: spacing($size);
  }
}

@mixin padding($size, $direction: null) {
  @if $direction == null {
    padding: spacing($size);
  } @else {
    padding-#{$direction}: spacing($size);
  }
}
```

## Mixiny Dostępności

### Focus Management

```scss
// utilities/_helpers.scss

// Accessible focus styles
@mixin focus-ring($color: var(--colors-border-focus), $width: 2px, $offset: 2px) {
  outline: none;

  &:focus-visible {
    outline: $width solid $color;
    outline-offset: $offset;
  }
}

// High contrast focus for better accessibility
@mixin high-contrast-focus {
  &:focus-visible {
    outline: 3px solid #000000;
    outline-offset: 2px;

    @media (prefers-contrast: high) {
      outline: 3px solid #ffffff;
    }
  }
}

// Skip link for keyboard navigation
@mixin skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--colors-bg-default);
  color: var(--colors-text-primary);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;

  &:focus {
    top: 6px;
  }
}
```

### Screen Reader Utilities

```scss
// Hide content visually but keep for screen readers
@mixin sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Show content only for screen readers
@mixin sr-only-focusable {
  @include sr-only;

  &:focus,
  &:active {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
}

// Hide content from screen readers
@mixin aria-hidden {
  aria-hidden: true;
}
```

### Reduced Motion Support

```scss
// Respect user's motion preferences
@mixin respect-motion($animation...) {
  @media (prefers-reduced-motion: no-preference) {
    @content;
  }
}

// Alternative for reduced motion
@mixin reduced-motion($property, $value) {
  #{$property}: $value;

  @media (prefers-reduced-motion: reduce) {
    #{$property}: none;
  }
}
```

## Generowanie Klas Utility

### System Generowania Klas

```scss
// Generate utility classes from maps
@mixin generate-utility-classes($prefix, $utilities, $property) {
  @each $key, $value in $utilities {
    .#{$prefix}-#{$key} {
      #{$property}: $value;
    }
  }
}

// Generate spacing utility classes
@mixin generate-spacing-classes {
  @each $key, $value in $spacing-scale {
    // Margin classes
    .m-#{$key} {
      margin: $value;
    }
    .mt-#{$key} {
      margin-top: $value;
    }
    .mr-#{$key} {
      margin-right: $value;
    }
    .mb-#{$key} {
      margin-bottom: $value;
    }
    .ml-#{$key} {
      margin-left: $value;
    }
    .mx-#{$key} {
      margin-left: $value;
      margin-right: $value;
    }
    .my-#{$key} {
      margin-top: $value;
      margin-bottom: $value;
    }

    // Padding classes
    .p-#{$key} {
      padding: $value;
    }
    .pt-#{$key} {
      padding-top: $value;
    }
    .pr-#{$key} {
      padding-right: $value;
    }
    .pb-#{$key} {
      padding-bottom: $value;
    }
    .pl-#{$key} {
      padding-left: $value;
    }
    .px-#{$key} {
      padding-left: $value;
      padding-right: $value;
    }
    .py-#{$key} {
      padding-top: $value;
      padding-bottom: $value;
    }
  }
}

// Generate color utility classes
@mixin generate-color-classes($colors) {
  @each $name, $shades in $colors {
    @if type-of($shades) == 'map' {
      @each $shade, $value in $shades {
        .text-#{$name}-#{$shade} {
          color: $value;
        }
        .bg-#{$name}-#{$shade} {
          background-color: $value;
        }
        .border-#{$name}-#{$shade} {
          border-color: $value;
        }
      }
    } @else {
      .text-#{$name} {
        color: $shades;
      }
      .bg-#{$name} {
        background-color: $shades;
      }
      .border-#{$name} {
        border-color: $shades;
      }
    }
  }
}

// Generate typography utility classes
@mixin generate-typography-classes($typography) {
  // Font family
  $font-families: map.get($typography, 'font-family');
  @each $name, $value in $font-families {
    .font-#{$name} {
      font-family: $value;
    }
  }

  // Font size
  $font-sizes: map.get($typography, 'font-size');
  @each $name, $value in $font-sizes {
    .text-#{$name} {
      font-size: $value;
    }
  }

  // Font weight
  $font-weights: map.get($typography, 'font-weight');
  @each $name, $value in $font-weights {
    .font-#{$name} {
      font-weight: $value;
    }
  }

  // Line height
  $line-heights: map.get($typography, 'line-height');
  @each $name, $value in $line-heights {
    .leading-#{$name} {
      line-height: $value;
    }
  }

  // Letter spacing
  $letter-spacings: map.get($typography, 'letter-spacing');
  @each $name, $value in $letter-spacings {
    .tracking-#{$name} {
      letter-spacing: $value;
    }
  }
}
```

## TypeScript Integration

### Utility Types

```typescript
// types/utilities.ts

// Spacing scale type
export type SpacingScale = keyof typeof spacingScale;

// Breakpoint names
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Color palette type
export interface ColorPalette {
  [key: number]: string;
}

// Utility class generators
export interface UtilityGenerators {
  spacing: (prefix: string) => string[];
  colors: (palette: ColorPalette) => string[];
  typography: (config: TypographyConfig) => string[];
}

// Animation configuration
export interface AnimationConfig {
  duration: 'instant' | 'fast' | 'base' | 'slow' | 'slower';
  timing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'smooth';
  delay?: string;
}

// Responsive utilities
export interface ResponsiveUtilities {
  breakpoints: Record<BreakpointName, number>;
  generateMediaQuery: (breakpoint: BreakpointName, type?: 'min' | 'max') => string;
}
```

### Utility Functions

```typescript
// utilities/helpers.ts

// Generate CSS custom properties from theme
export function generateCSSVariables(theme: Theme, prefix = '--'): Record<string, string> {
  const variables: Record<string, string> = {};

  function flatten(obj: any, path: string[] = []) {
    for (const key in obj) {
      const value = obj[key];
      const currentPath = [...path, key];

      if (typeof value === 'object' && value !== null) {
        flatten(value, currentPath);
      } else {
        const cssKey = prefix + currentPath.join('-');
        variables[cssKey] = String(value);
      }
    }
  }

  flatten(theme);
  return variables;
}

// Generate utility classes
export function generateUtilityClasses(config: UtilityGenerators): string[] {
  const classes: string[] = [];

  // Spacing classes
  classes.push(...config.spacing('m'));
  classes.push(...config.spacing('p'));

  // Color classes
  classes.push(
    ...config.colors({
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#3b82f6',
      900: '#1e293b',
    })
  );

  // Typography classes
  classes.push(
    ...config.typography({
      'font-family': { sans: '-apple-system, sans-serif' },
      'font-size': { sm: '0.875rem', base: '1rem', lg: '1.125rem' },
      'font-weight': { normal: 400, bold: 700 },
    })
  );

  return classes;
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

## Testing Narzędzi

### Testy Funkcji SCSS

```scss
// Test color functions
.test-color-functions {
  // Test lighten
  .lighten-test {
    background-color: color-lighten(#3b82f6, 0.2);
  }

  // Test darken
  .darken-test {
    background-color: color-darken(#3b82f6, 0.2);
  }

  // Test contrast
  .contrast-test {
    color: accessible-text-color(#3b82f6);
  }
}

// Test responsive utilities
.test-responsive {
  @include responsive-text(0.875rem, 1rem, 1.125rem);

  @media #{media-query(md)} {
    font-size: 1rem;
  }

  @media #{media-query(lg)} {
    font-size: 1.125rem;
  }
}
```

### Testy Komponentów z Narzędziami

```typescript
// utilities.test.ts
import {
  generateCSSVariables,
  generateUtilityClasses,
  debounce,
  throttle,
} from './utilities/helpers';
import { Theme } from '../types/theme';

describe('Utility Functions', () => {
  const mockTheme: Partial<Theme> = {
    colors: {
      primary: { 500: '#3b82f6' },
      text: { primary: '#1f2937' },
    },
  };

  it('generates CSS variables from theme', () => {
    const variables = generateCSSVariables(mockTheme as Theme);

    expect(variables['--colors-primary-500']).toBe('#3b82f6');
    expect(variables['--colors-text-primary']).toBe('#1f2937');
  });

  it('generates utility classes', () => {
    const classes = generateUtilityClasses({
      spacing: prefix => [`${prefix}-1`, `${prefix}-2`],
      colors: () => ['text-blue-500', 'bg-blue-500'],
      typography: () => ['text-sm', 'font-bold'],
    });

    expect(classes).toContain('m-1');
    expect(classes).toContain('text-blue-500');
    expect(classes).toContain('text-sm');
  });

  it('debounces function calls', async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('throttles function calls', async () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    await new Promise(resolve => setTimeout(resolve, 150));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Considerations

### Optymalizacja Narzędzi

1. **Lazy Loading**: Generuj klasy utility tylko gdy są potrzebne
2. **Purging**: Usuwaj nieużywane klasy w produkcji
3. **Caching**: Cache'uj wyniki funkcji SCSS
4. **Minimal Generation**: Generuj tylko używane warianty

### Best Practices

```scss
// ✅ Good - Use specific utilities
.btn {
  @include transition(color, fast);
  @include focus-ring();
}

// ❌ Avoid - Overusing utilities
.btn {
  @include transition(all, slow, bounce);
  @include flex(row, wrap, space-between, center, 2rem);
  // Too many utilities make code hard to maintain
}
```

### CSS Optimization

```scss
// Group similar utilities
.utilities {
  // Group spacing utilities
  .m-1 {
    margin: 0.25rem;
  }
  .m-2 {
    margin: 0.5rem;
  }
  .m-3 {
    margin: 0.75rem;
  }

  // Group color utilities
  .text-primary {
    color: var(--colors-text-primary);
  }
  .text-secondary {
    color: var(--colors-text-secondary);
  }
}
```

## Future Enhancements

### Planned Features

1. **Advanced Color Functions**: HSL manipulation, color mixing
2. **CSS Grid Utilities**: Complex grid patterns
3. **Animation Library**: Predefined animation sets
4. **Utility Builder**: Visual utility class generator
5. **Performance Monitoring**: Utility usage analytics

### Advanced Utilities

1. **Container Queries**: Size-based responsive utilities
2. **Aspect Ratios**: Dynamic aspect ratio utilities
3. **Logical Properties**: Flow-relative utilities
4. **Custom Properties**: Dynamic utility generation
5. **Theme Integration**: Theme-aware utility classes
