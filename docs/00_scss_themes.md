# 00. System Motywów

## Architektura Systemu Motywów

System motywów zapewnia dynamiczne przełączanie między jasnym i ciemnym motywem bez rekompilacji CSS. Wykorzystuje CSS custom properties (zmienne CSS) dla maksymalnej wydajności i elastyczności.

### Kluczowe Funkcjonalności

- **CSS Custom Properties**: Natywne zmienne CSS dla dynamicznych zmian
- **Jasny/Ciemny Motyw**: Wbudowana obsługa preferencji systemu
- **Rozszerzalność**: Łatwe dodawanie nowych motywów
- **Type Safety**: TypeScript integration dla motywów
- **Performance**: Zero-cost theme switching

## Struktura Motywu

Każdy motyw jest mapą SCSS zawierającą wszystkie design tokens zorganizowane hierarchicznie.

### Schemat Motywu

```scss
$theme-structure: (
  name: 'default',
  colors: (
    primary: (
      50: #e3f2fd,
      100: #bbdefb,
      // ... 200-900
      500: #2196f3,
      // Base
      600: #1e88e5,
      // ... 700-900
    ),
    secondary: (
      /* ... */
    ),
    neutral: (
      /* ... */
    ),
    success: (
      /* ... */
    ),
    warning: (
      /* ... */
    ),
    error: (
      /* ... */
    ),
    info: (
      /* ... */
    ),
    text: (
      primary: #212121,
      secondary: #757575,
      disabled: #bdbdbd,
      inverse: #ffffff,
    ),
    bg: (
      default: #ffffff,
      subtle: #f5f5f5,
      hover: #f5f5f5,
      active: #eeeeee,
      disabled: #f5f5f5,
    ),
    border: (
      default: #e0e0e0,
      hover: #bdbdbd,
      focus: #2196f3,
      error: #f44336,
    ),
  ),
  typography: (
    font-family: (
      primary: (
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        sans-serif,
      ),
      secondary: (
        'Georgia',
        serif,
      ),
      mono: (
        'Fira Code',
        monospace,
      ),
    ),
    font-size: (
      xs: 0.64rem,
      sm: 0.8rem,
      base: 1rem,
      md: 1.25rem,
      lg: 1.563rem,
      xl: 1.953rem,
      '2xl': 2.441rem,
      '3xl': 3.052rem,
      '4xl': 3.815rem,
      '5xl': 4.768rem,
    ),
    font-weight: (
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    ),
    line-height: (
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    ),
    letter-spacing: (
      tighter: -0.05em,
      tight: -0.025em,
      normal: 0,
      wide: 0.025em,
      wider: 0.05em,
      widest: 0.1em,
    ),
  ),
  spacing: (
    0: 0,
    px: 1px,
    '0-5': 0.125rem,
    1: 0.25rem,
    // ... up to 96
  ),
  shadows: (
    none: none,
    sm: (
      0 1px 2px 0 rgba(0, 0, 0, 0.05),
    ),
    default: (
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06),
    ),
    md: (
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
    ),
    lg: (
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05),
    ),
    xl: (
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04),
    ),
    '2xl': (
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
    ),
    inner: (
      inset 0 2px 4px 0 rgba(0, 0, 0, 0.06),
    ),
  ),
  borders: (
    width: (
      0: 0,
      default: 1px,
      2: 2px,
      4: 4px,
      8: 8px,
    ),
    radius: (
      none: 0,
      sm: 0.125rem,
      default: 0.25rem,
      md: 0.375rem,
      lg: 0.5rem,
      xl: 0.75rem,
      '2xl': 1rem,
      '3xl': 1.5rem,
      full: 9999px,
    ),
  ),
  z-index: (
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    'modal-backdrop': 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  ),
);
```

## Motyw Jasny (Default)

```scss
// themes/_default.scss
@use 'sass:map';
@use 'theme-variables' as vars;
@use '../base/colors' as colors;

$theme-default: map.merge(
  vars.$theme-structure,
  (
    name: 'default',
    colors: (
      text: (
        primary: colors.$color-neutral-900,
        secondary: colors.$color-neutral-700,
        disabled: colors.$color-neutral-400,
        inverse: #ffffff,
      ),
      bg: (
        default: #ffffff,
        subtle: colors.$color-neutral-50,
        hover: colors.$color-neutral-100,
        active: colors.$color-neutral-200,
        disabled: colors.$color-neutral-100,
      ),
      border: (
        default: colors.$color-neutral-300,
        hover: colors.$color-neutral-400,
        focus: colors.$color-primary-500,
        error: colors.$color-error-500,
      ),
    ),
  )
);
```

## Motyw Ciemny

```scss
// themes/_dark.scss
@use 'sass:map';
@use 'theme-variables' as vars;
@use '../base/colors' as colors;

$theme-dark: map.merge(
  vars.$theme-structure,
  (
    name: 'dark',
    colors: (
      text: (
        primary: colors.$color-neutral-50,
        secondary: colors.$color-neutral-300,
        disabled: colors.$color-neutral-500,
        inverse: colors.$color-neutral-900,
      ),
      bg: (
        default: colors.$color-neutral-900,
        subtle: colors.$color-neutral-800,
        hover: colors.$color-neutral-700,
        active: colors.$color-neutral-600,
        disabled: colors.$color-neutral-800,
      ),
      border: (
        default: colors.$color-neutral-700,
        hover: colors.$color-neutral-600,
        focus: colors.$color-primary-400,
        error: colors.$color-error-400,
      ),
    ),
  )
);
```

## Mixiny Motywów

### Zastosowanie Motywu

```scss
// themes/_theme-mixins.scss

// Apply theme globally
@mixin apply-theme($theme) {
  $current-theme: $theme !global;

  :root {
    @include generate-css-vars('', $theme);
  }
}

// Generate CSS custom properties recursively
@mixin generate-css-vars($prefix, $map) {
  @each $key, $value in $map {
    $css-key: if($prefix == '', '--#{$key}', '--#{$prefix}-#{$key}');

    @if type-of($value) == 'map' {
      @include generate-css-vars($key, $value);
    } @else {
      #{$css-key}: #{$value};
    }
  }
}
```

### Dostęp do Wartości Motywu

```scss
// Get value from current theme
@function theme-get($keys...) {
  @if $current-theme == null {
    @error 'No theme is currently active. Use @include apply-theme($theme) first.';
  }

  $value: $current-theme;

  @each $key in $keys {
    @if map.has-key($value, $key) {
      $value: map.get($value, $key);
    } @else {
      @error 'Key "#{$key}" not found in theme. Available keys: #{map.keys($value)}';
    }
  }

  @return $value;
}

// Apply property from theme
@mixin theme-prop($property, $keys...) {
  $value: theme-get($keys...);
  #{$property}: $value;
}

// Apply multiple properties from theme
@mixin theme-props($props) {
  @each $prop, $keys in $props {
    @include theme-prop($prop, $keys...);
  }
}
```

### Generowanie Klas Utility

```scss
// Generate color classes
@mixin theme-color-classes($prefix: 'color') {
  $colors: theme-get('colors');

  @each $color-name, $color-shades in $colors {
    @if type-of($color-shades) == 'map' {
      @each $shade, $value in $color-shades {
        .#{$prefix}-#{$color-name}-#{$shade} {
          color: $value;
        }

        .bg-#{$color-name}-#{$shade} {
          background-color: $value;
        }

        .border-#{$color-name}-#{$shade} {
          border-color: $value;
        }
      }
    } @else {
      .#{$prefix}-#{$color-name} {
        color: $color-shades;
      }

      .bg-#{$color-name} {
        background-color: $color-shades;
      }

      .border-#{$color-name} {
        border-color: $color-shades;
      }
    }
  }
}

// Generate spacing classes
@mixin theme-spacing-classes($prefix: 'p', $property: padding) {
  $spacing: theme-get('spacing');

  @each $key, $value in $spacing {
    .#{$prefix}-#{$key} {
      #{$property}: $value;
    }
  }
}

// Generate typography classes
@mixin theme-typography-classes() {
  $typography: theme-get('typography');

  // Font family classes
  $font-families: map.get($typography, 'font-family');
  @each $name, $value in $font-families {
    .font-#{$name} {
      font-family: $value;
    }
  }

  // Font size classes
  $font-sizes: map.get($typography, 'font-size');
  @each $name, $value in $font-sizes {
    .text-#{$name} {
      font-size: $value;
    }
  }

  // Font weight classes
  $font-weights: map.get($typography, 'font-weight');
  @each $name, $value in $font-weights {
    .font-#{$name} {
      font-weight: $value;
    }
  }

  // Line height classes
  $line-heights: map.get($typography, 'line-height');
  @each $name, $value in $line-heights {
    .leading-#{$name} {
      line-height: $value;
    }
  }

  // Letter spacing classes
  $letter-spacings: map.get($typography, 'letter-spacing');
  @each $name, $value in $letter-spacings {
    .tracking-#{$name} {
      letter-spacing: $value;
    }
  }
}
```

## Użycie w Komponentach

### Bezpośrednie Użycie

```scss
// components/_buttons.scss
@use '../themes/theme-mixins' as theme;

.btn {
  @include theme.theme-prop(color, colors, text, primary);
  @include theme.theme-prop(background-color, colors, bg, default);
  @include theme.theme-prop(border-color, colors, border, default);

  &:hover {
    @include theme.theme-prop(background-color, colors, bg, hover);
  }

  &:focus {
    @include theme.theme-prop(border-color, colors, border, focus);
  }
}
```

### Użycie przez CSS Custom Properties

```scss
// components/_buttons.scss
.btn {
  color: var(--colors-text-primary);
  background-color: var(--colors-bg-default);
  border-color: var(--colors-border-default);

  &:hover {
    background-color: var(--colors-bg-hover);
  }

  &:focus {
    border-color: var(--colors-border-focus);
  }
}
```

## Przełączanie Motywów

### JavaScript/TypeScript

```typescript
// theme-manager.ts
export class ThemeManager {
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    this.init();
  }

  private init() {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');

    // Listen for changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.setTheme(e.matches ? 'dark' : 'light');
    });
  }

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
```

### CSS Implementation

```scss
// themes/_theme-mixins.scss
@mixin theme-aware($light-value, $dark-value) {
  @include theme.theme-prop(#{$property}, $light-value);

  [data-theme='dark'] & {
    @include theme.theme-prop(#{$property}, $dark-value);
  }
}

// Usage
.btn {
  @include theme-aware(
    background-color,
    (colors, bg, default),
    (colors, bg, default) // For dark theme - adjust as needed
  );
}
```

## Rozszerzanie Motywów

### Dodawanie Nowych Właściwości

```scss
// themes/_custom.scss
@use 'sass:map';
@use 'theme-variables' as vars;

$theme-custom: map.merge(
  vars.$theme-structure,
  (
    name: 'custom',
    // Add custom properties
    custom: (
        brand-color: #ff6b6b,
        accent-color: #4ecdc4,
        border-radius: 12px,
      ),
    // Override existing properties
    colors: (
        primary: (
          500: #ff6b6b,
          // Custom primary color
        ),
      ),
  )
);
```

### Custom Theme Provider

```tsx
// ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from 'preact/hooks';

type Theme = 'light' | 'dark' | 'custom';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## TypeScript Integration

### Theme Types

```typescript
// types/theme.ts
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type ColorPalette = Record<ColorShade, string>;

export interface ThemeColors {
  primary: ColorPalette;
  secondary: ColorPalette;
  neutral: ColorPalette;
  success: { 50: string; 500: string; 700: string };
  warning: { 50: string; 500: string; 700: string };
  error: { 50: string; 500: string; 700: string };
  info: { 50: string; 500: string; 700: string };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  bg: {
    default: string;
    subtle: string;
    hover: string;
    active: string;
    disabled: string;
  };
  border: {
    default: string;
    hover: string;
    focus: string;
    error: string;
  };
}

export interface ThemeTypography {
  'font-family': {
    primary: string;
    secondary: string;
    mono: string;
  };
  'font-size': Record<string, string>;
  'font-weight': Record<string, number>;
  'line-height': Record<string, number>;
  'letter-spacing': Record<string, string>;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  borders: {
    width: Record<string, string>;
    radius: Record<string, string>;
  };
  'z-index': Record<string, number>;
}

// Utility type for theme paths
export type ThemePath = string; // e.g., "colors.primary.500"
```

### Theme Hook

```typescript
// hooks/useTheme.ts
import { useTheme as useThemeContext } from '../components/ThemeProvider';
import type { Theme, ThemePath } from '../types/theme';

export function useThemeValue(path: ThemePath): string {
  // Implementation to get theme value by path
  // This would integrate with the CSS custom properties
  return `var(--${path.replace(/\./g, '-')})`;
}

export function useTheme() {
  return useThemeContext();
}
```

## Performance Considerations

### CSS Custom Properties Benefits

- **Zero Runtime Cost**: Theme switching happens in CSS, not JavaScript
- **No Re-renders**: Components don't need to re-render on theme change
- **Small Bundle Size**: Theme logic stays in CSS
- **Hardware Acceleration**: GPU-accelerated transitions

### Best Practices

1. **Use CSS Custom Properties for Dynamic Values**

   ```scss
   // ✅ Good
   .btn {
     background-color: var(--colors-primary-500);
   }

   // ❌ Avoid
   .btn {
     background-color: theme-get(colors, primary, 500);
   }
   ```

2. **Limit Theme Properties**
   - Keep theme objects small
   - Only include properties that actually change
   - Use inheritance where possible

3. **Optimize CSS Custom Property Names**

   ```scss
   // ✅ Good - semantic names
   --colors-primary-500
   --spacing-md

   // ❌ Avoid - generic names
   --color1
   --space5
   ```

4. **Use CSS Containment for Theme Scoping**

   ```scss
   [data-theme] {
     contain: style;
   }
   ```

## Testing Motywów

### Visual Regression Testing

```typescript
// theme.test.ts
import { render } from '@testing-library/preact';
import { ThemeProvider } from '../components/ThemeProvider';
import { Button } from '../components/Button';

describe('Theme System', () => {
  it('renders with light theme', () => {
    const { container } = render(
      <ThemeProvider theme="light">
        <Button>Click me</Button>
      </ThemeProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with dark theme', () => {
    const { container } = render(
      <ThemeProvider theme="dark">
        <Button>Click me</Button>
      </ThemeProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('switches theme dynamically', () => {
    const { container, rerender } = render(
      <ThemeProvider theme="light">
        <Button>Click me</Button>
      </ThemeProvider>
    );

    // Switch to dark theme
    rerender(
      <ThemeProvider theme="dark">
        <Button>Click me</Button>
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
```

### CSS Custom Properties Testing

```typescript
// theme-css.test.ts
describe('CSS Custom Properties', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });

  it('applies light theme CSS variables', () => {
    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue('--colors-primary-500');

    expect(primaryColor).toBe('#2196f3');
  });

  it('switches to dark theme', () => {
    document.documentElement.setAttribute('data-theme', 'dark');

    const root = document.documentElement;
    const bgColor = getComputedStyle(root).getPropertyValue('--colors-bg-default');

    expect(bgColor).toBe('#212121');
  });
});
```

## Accessibility Considerations

### High Contrast Support

```scss
// themes/_high-contrast.scss
$theme-high-contrast: map.merge(
  vars.$theme-structure,
  (
    name: 'high-contrast',
    colors: (
      text: (
        primary: #000000,
        secondary: #000000,
        disabled: #666666,
        inverse: #ffffff,
      ),
      bg: (
        default: #ffffff,
        subtle: #f0f0f0,
        hover: #e0e0e0,
        active: #d0d0d0,
        disabled: #cccccc,
      ),
      border: (
        default: #000000,
        hover: #000000,
        focus: #0000ff,
        error: #ff0000,
      ),
    ),
  )
);
```

### Reduced Motion

```scss
// themes/_theme-mixins.scss
@mixin theme-transition($property, $duration: null, $easing: null) {
  $duration: $duration or theme-get(transitions, duration, base);
  $easing: $easing or theme-get(transitions, timing, ease);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: #{$property} #{$duration} #{$easing};
  }
}
```

## Future Enhancements

### Planned Features

1. **Theme Builder UI**: Visual theme editor
2. **Theme Presets**: Predefined theme collections
3. **Theme Validation**: Runtime theme validation
4. **Theme Migration**: Automatic theme migration tools
5. **Theme Analytics**: Usage tracking and optimization

### Advanced Features

1. **Dynamic Themes**: Runtime theme generation
2. **Theme Interpolation**: Smooth theme transitions
3. **Theme Inheritance**: Base themes with overrides
4. **Theme Scoping**: Component-level themes
5. **Theme Hot Reload**: Development-time theme updates
