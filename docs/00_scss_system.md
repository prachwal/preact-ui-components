# 00. System SCSS

## Architektura Systemu SCSS

System SCSS dla biblioteki komponentów UI w Preact jest zbudowany w oparciu o nowoczesne praktyki Sass, wykorzystując `@use` i `@forward` zamiast przestarzałego `@import`. Zapewnia to lepszą enkapsulację, unikanie konfliktów nazw i poprawę wydajności kompilacji.

### Kluczowe Założenia

- **Modularność**: Każdy plik odpowiada za jedną odpowiedzialność
- **Skalowalność**: Łatwe rozszerzanie bez łamania istniejącego kodu
- **Konsystencja**: Zunifikowane wzorce projektowe
- **Performance**: Minimalizacja duplikatów i optymalizacja wyjścia CSS
- **DX**: Doskonałe doświadczenie programisty z pełnym IntelliSense

### Struktura Katalogów

```text
src/styles/
├── index.scss              # Główny punkt wejścia
├── base/                   # Podstawowe style
│   ├── _reset.scss         # CSS reset/normalize
│   ├── _colors.scss        # Zmienne kolorów
│   ├── _spacing.scss       # Zmienne odstępów
│   └── _typography.scss    # Podstawowa typografia
├── components/             # Style komponentów
│   ├── _buttons.scss       # Style przycisków
│   ├── _forms.scss         # Style formularzy
│   ├── _cards.scss         # Style kart
│   └── _modals.scss        # Style modali
├── utilities/              # Narzędzia pomocnicze
│   ├── _mixins.scss        # Mixiny
│   ├── _functions.scss     # Funkcje SCSS
│   ├── _responsive.scss    # Responsywność
│   ├── _animations.scss    # Animacje
│   └── _helpers.scss       # Klasy pomocnicze
├── themes/                 # System motywów
│   ├── _theme-variables.scss
│   ├── _theme-mixins.scss
│   ├── _default.scss       # Motyw jasny
│   └── _dark.scss          # Motyw ciemny
└── variables/              # Zmienne design tokens
    ├── _typography.scss    # Rozmiary czcionek, wagi
    ├── _sizes.scss         # Rozmiary komponentów
    ├── _breakpoints.scss   # Punkty przełomowe
    ├── _z-index.scss       # Warstwy z-index
    ├── _borders.scss       # Border radius, width
    ├── _shadows.scss       # Definicje cieni
    └── _transitions.scss   # Czas i funkcje przejść
```

## System Zmiennych (Design Tokens)

### Kolory

System kolorów jest zbudowany hierarchicznie, zapewniając konsekwentne użycie kolorów w całej aplikacji.

#### Paleta Główna

```scss
// Primary - główny kolor marki (niebieski)
$color-primary-50: #e3f2fd;
$color-primary-100: #bbdefb;
$color-primary-200: #90caf9;
$color-primary-300: #64b5f6;
$color-primary-400: #42a5f5;
$color-primary-500: #2196f3; // Base
$color-primary-600: #1e88e5;
$color-primary-700: #1976d2;
$color-primary-800: #1565c0;
$color-primary-900: #0d47a1;

// Secondary - kolor akcentujący (różowy)
$color-secondary-50: #fce4ec;
$color-secondary-100: #f8bbd0;
$color-secondary-200: #f48fb1;
$color-secondary-300: #f06292;
$color-secondary-400: #ec407a;
$color-secondary-500: #e91e63; // Base
$color-secondary-600: #d81b60;
$color-secondary-700: #c2185b;
$color-secondary-800: #ad1457;
$color-secondary-900: #880e4f;

// Neutral - skala szarości
$color-neutral-50: #fafafa;
$color-neutral-100: #f5f5f5;
$color-neutral-200: #eeeeee;
$color-neutral-300: #e0e0e0;
$color-neutral-400: #bdbdbd;
$color-neutral-500: #9e9e9e;
$color-neutral-600: #757575;
$color-neutral-700: #616161;
$color-neutral-800: #424242;
$color-neutral-900: #212121;
```

#### Kolory Semantyczne

```scss
// Status colors
$color-success-50: #e8f5e9;
$color-success-500: #4caf50; // Base
$color-success-700: #388e3c;

$color-warning-50: #fff3e0;
$color-warning-500: #ff9800; // Base
$color-warning-700: #f57c00;

$color-error-50: #ffebee;
$color-error-500: #f44336; // Base
$color-error-700: #d32f2f;

$color-info-50: #e1f5fe;
$color-info-500: #03a9f4; // Base
$color-info-700: #0288d1;
```

### Typografia

```scss
// Font families
$font-family-primary:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
  'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
$font-family-secondary: 'Georgia', 'Times New Roman', serif;
$font-family-mono: 'Fira Code', 'Courier New', monospace;

// Font sizes (skala modularna 1.250 - major third)
$font-size-xs: 0.64rem; // 10.24px
$font-size-sm: 0.8rem; // 12.8px
$font-size-base: 1rem; // 16px
$font-size-md: 1.25rem; // 20px
$font-size-lg: 1.563rem; // 25px
$font-size-xl: 1.953rem; // 31.25px
$font-size-2xl: 2.441rem; // 39px
$font-size-3xl: 3.052rem; // 48.83px
$font-size-4xl: 3.815rem; // 61px
$font-size-5xl: 4.768rem; // 76.29px

// Font weights
$font-weight-thin: 100;
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$font-weight-extrabold: 800;
$font-weight-black: 900;

// Line heights
$line-height-tight: 1.25;
$line-height-snug: 1.375;
$line-height-normal: 1.5;
$line-height-relaxed: 1.625;
$line-height-loose: 2;
```

### Spacing

```scss
// Skala 8px base (0.5rem)
$spacing-0: 0;
$spacing-px: 1px;
$spacing-0-5: 0.125rem; // 2px
$spacing-1: 0.25rem; // 4px
$spacing-1-5: 0.375rem; // 6px
$spacing-2: 0.5rem; // 8px
$spacing-2-5: 0.625rem; // 10px
$spacing-3: 0.75rem; // 12px
$spacing-3-5: 0.875rem; // 14px
$spacing-4: 1rem; // 16px
$spacing-5: 1.25rem; // 20px
$spacing-6: 1.5rem; // 24px
$spacing-7: 1.75rem; // 28px
$spacing-8: 2rem; // 32px
$spacing-9: 2.25rem; // 36px
$spacing-10: 2.5rem; // 40px
$spacing-12: 3rem; // 48px
$spacing-14: 3.5rem; // 56px
$spacing-16: 4rem; // 64px
$spacing-20: 5rem; // 80px
$spacing-24: 6rem; // 96px
$spacing-28: 7rem; // 112px
$spacing-32: 8rem; // 128px
$spacing-36: 9rem; // 144px
$spacing-40: 10rem; // 160px
```

### Rozmiary Komponentów

```scss
// Component sizes
$size-xs: 1.5rem; // 24px
$size-sm: 2rem; // 32px
$size-md: 2.5rem; // 40px
$size-lg: 3rem; // 48px
$size-xl: 3.5rem; // 56px
$size-2xl: 4rem; // 64px

// Container widths
$container-sm: 640px;
$container-md: 768px;
$container-lg: 1024px;
$container-xl: 1280px;
$container-2xl: 1536px;
```

### Breakpoints

```scss
// Mobile-first breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;

// Breakpoint map
$breakpoints: (
  sm: $breakpoint-sm,
  md: $breakpoint-md,
  lg: $breakpoint-lg,
  xl: $breakpoint-xl,
  '2xl': $breakpoint-2xl,
);
```

### Shadows

```scss
// Box shadows
$shadow-none: none;
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-default:
  0 1px 3px 0 rgba(0, 0, 0, 0.1),
  0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl:
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
$shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

// Elevation system
$elevation-1: $shadow-sm;
$elevation-2: $shadow-default;
$elevation-3: $shadow-md;
$elevation-4: $shadow-lg;
$elevation-5: $shadow-xl;
```

## Mixiny

### Layout Mixiny

```scss
// Flex utilities
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// Grid responsive
@mixin grid-responsive($columns: 4, $gap: $spacing-4) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, #{$columns}fr), 1fr));
  gap: $gap;

  @include respond-to(md) {
    grid-template-columns: repeat($columns, 1fr);
  }
}

// Container
@mixin container($max-width: $container-xl, $padding: $spacing-4) {
  max-width: $max-width;
  margin: 0 auto;
  padding-left: $padding;
  padding-right: $padding;
}
```

### Component Mixiny

```scss
// Button variants
@mixin button-variant($color, $background, $border: $background) {
  color: $color;
  background-color: $background;
  border-color: $border;

  &:hover:not(:disabled) {
    background-color: color.adjust($background, $lightness: -5%);
    border-color: color.adjust($border, $lightness: -5%);
  }

  &:active {
    background-color: color.adjust($background, $lightness: -10%);
    border-color: color.adjust($border, $lightness: -10%);
  }
}

// Input focus
@mixin input-focus($color: $color-primary-500) {
  &:focus {
    outline: none;
    border-color: $color;
    box-shadow: 0 0 0 3px rgba($color, 0.1);
  }
}

// Card shadow
@mixin card-shadow($level: 2) {
  box-shadow: map.get($elevation-#{$level});
  transition: box-shadow $transition-duration-base $transition-timing-ease;
}

// Hover lift effect
@mixin hover-lift($translateY: -2px, $shadow-level: 3) {
  transition:
    transform $transition-duration-base $transition-timing-ease,
    box-shadow $transition-duration-base $transition-timing-ease;

  &:hover {
    transform: translateY($translateY);
    box-shadow: map.get($elevation-#{$shadow-level});
  }
}
```

### Responsive Mixiny

```scss
// Media query helpers
@mixin respond-to($breakpoint) {
  @if map.has-key($breakpoints, $breakpoint) {
    @media (min-width: map.get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn 'Breakpoint "#{$breakpoint}" not found in $breakpoints map.';
  }
}

@mixin respond-below($breakpoint) {
  @if map.has-key($breakpoints, $breakpoint) {
    @media (max-width: map.get($breakpoints, $breakpoint) - 0.02) {
      @content;
    }
  } @else {
    @warn 'Breakpoint "#{$breakpoint}" not found in $breakpoints map.';
  }
}

// Responsive property
@mixin responsive-property($property, $values) {
  // Mobile first
  #{$property}: map.get($values, mobile);

  @if map.has-key($values, tablet) {
    @include respond-to(md) {
      #{$property}: map.get($values, tablet);
    }
  }

  @if map.has-key($values, desktop) {
    @include respond-to(lg) {
      #{$property}: map.get($values, desktop);
    }
  }
}
```

## Funkcje

### Utility Functions

```scss
// Strip unit from value
@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
}

// Convert px to rem
@function rem($pixels, $context: 16) {
  @if unitless($pixels) {
    @return $pixels / $context * 1rem;
  }
  @return $pixels;
}

// Convert px to em
@function em($pixels, $context: 16) {
  @if unitless($pixels) {
    @return $pixels / $context * 1em;
  }
  @return $pixels;
}

// Get z-index from map
@function z($layer) {
  @if map.has-key($z-layers, $layer) {
    @return map.get($z-layers, $layer);
  }
  @return 0;
}

// Get breakpoint value
@function breakpoint($name) {
  @if map.has-key($breakpoints, $name) {
    @return map.get($breakpoints, $name);
  }
  @return null;
}
```

### Color Functions

```scss
// Lighten color (tint)
@function tint($color, $percentage) {
  @return color.mix(white, $color, $percentage);
}

// Darken color (shade)
@function shade($color, $percentage) {
  @return color.mix(black, $color, $percentage);
}

// Calculate contrast color
@function contrast-color($color, $light: white, $dark: black) {
  $luminance: color.luminance($color);
  @return if($luminance > 0.5, $dark, $light);
}
```

## Główny Plik Index

```scss
// =============================================================================
// Main Styles Entry Point
// =============================================================================

// 1. Variables (muszą być pierwsze)
@forward 'variables/breakpoints';
@forward 'variables/typography';
@forward 'variables/sizes';
@forward 'variables/z-index';
@forward 'variables/borders';
@forward 'variables/shadows';
@forward 'variables/transitions';

// 2. Functions (przed mixinami)
@forward 'utilities/functions';

// 3. Theme System
@use 'themes/theme-mixins';
@use 'themes/default' as default-theme;

// 4. Mixins
@forward 'utilities/mixins';
@forward 'utilities/responsive';
@forward 'utilities/animations';

// 5. Base Styles
@use 'base/reset';
@use 'base/colors';
@use 'base/spacing';
@use 'base/typography';

// 6. Components
@use 'components/buttons';
@use 'components/forms';
@use 'components/cards';
@use 'components/modals';

// 7. Utilities (ostatnie, najwyższy priorytet)
@use 'utilities/helpers';

// 8. Apply default theme
@include theme-mixins.apply-theme(default-theme.$theme-default);
```

## Best Practices

### 1. Używaj @use zamiast @import

```scss
// ✅ Dobrze
@use 'utilities/mixins' as mixins;

// ❌ Źle
@import 'utilities/mixins';
```

### 2. Namespace swoje mixiny i funkcje

```scss
// ✅ Dobrze
@use 'utilities/mixins' as *;

// Użycie
@include flex-center;

// ❌ Źle
@use 'utilities/mixins';

// Użycie
@include mixins.flex-center;
```

### 3. Forwarduj zmienne i mixiny

```scss
// ✅ Dobrze - w utilities/_mixins.scss
@forward 'mixins';

// ❌ Źle - bezpośrednie importowanie
@use 'utilities/mixins';
```

### 4. Używaj funkcji zamiast hardcoded wartości

```scss
// ✅ Dobrze
padding: rem(16);

// ❌ Źle
padding: 1rem;
```

### 5. Dokumentuj swoje mixiny

```scss
/// Flex center mixin
/// Centers content both horizontally and vertically
/// @param {String} $display [flex] - Display property
@mixin flex-center($display: flex) {
  display: $display;
  align-items: center;
  justify-content: center;
}
```

## Migracja z Legacy Systemu

Jeśli migrujesz z systemu używającego OKLCH kolorów:

1. **Zastąp zmienne kolorów** - użyj standardowych HSL kolorów
2. **Zaktualizuj funkcje kolorów** - użyj `color.adjust()` zamiast `lighten()`
3. **Przepisz mixiny motywów** - użyj nowego systemu CSS custom properties
4. **Zaktualizuj komponenty** - użyj nowych zmiennych zamiast legacy

## Narzędzia Deweloperskie

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [resolve(__dirname, 'src/styles')],
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});
```

### TypeScript Declarations

```typescript
// src/styles/index.scss.d.ts
export {};

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
```

## Performance Considerations

- **Tree shaking**: nieużywane zmienne są usuwane podczas kompilacji
- **CSS custom properties**: dynamiczne motywy bez rekompilacji
- **@use/@forward**: lepsza enkapsulacja i unikanie konfliktów
- **Modern compiler**: szybsza kompilacja Sass

## Rozszerzalność

System jest zaprojektowany do łatwego rozszerzania:

1. **Dodaj nowe zmienne** w odpowiednich plikach `variables/`
2. **Utwórz nowe mixiny** w `utilities/_mixins.scss`
3. **Dodaj komponenty** w `components/` używając istniejących tokenów
4. **Rozszerz motywy** w `themes/` dodając nowe właściwości

Dzięki modularnej architekturze, nowe funkcjonalności mogą być dodawane bez łamania istniejącego kodu.
