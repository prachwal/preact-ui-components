# Dokumentacja Systemu Styli SCSS

## Spis Treści

1. [Wprowadzenie](#wprowadzenie)
2. [Struktura Projektu](#struktura-projektu)
3. [System Zmiennych](#system-zmiennych)
4. [System Motywów](#system-motywów)
5. [Mixiny i Funkcje](#mixiny-i-funkcje)
6. [Architektura Komponentów](#architektura-komponentów)
7. [Przewodnik Implementacji](#przewodnik-implementacji)
8. [Integracja z Projektem](#integracja-z-projektem)
9. [Best Practices](#best-practices)
10. [Narzędzia Deweloperskie](#narzędzia-deweloperskie)

---

## Wprowadzenie

System styli SCSS dla biblioteki komponentów UI w Preact zapewnia:

- **Modularność** - wyraźnie oddzielone warstwy odpowiedzialności
- **Skalowalność** - łatwe rozszerzanie i dostosowywanie
- **Konsystencję** - ujednolicone wzorce projektowe
- **Themowanie** - pełne wsparcie dla własnych motywów
- **Responsywność** - wbudowane narzędzia do RWD
- **DX** - doskonałe doświadczenie programisty

### Kluczowe Założenia

- Wykorzystanie możliwości SCSS (zmienne, mixiny, funkcje)
- Mobile-first approach w responsywności
- Accessibility jako priorytet
- Optymalizacja wydajności (minimalizacja selektorów)
- Zgodność z BEM dla nazewnictwa

---

## Struktura Projektu

```text
/src/styles/
├── base/
│   ├── _reset.scss              # Reset/normalize CSS
│   ├── _typography.scss         # Podstawowe reguły typograficzne
│   ├── _colors.scss             # Zmienne kolorów bazowych
│   └── _spacing.scss            # Zmienne odstępów
│
├── components/
│   ├── _buttons.scss            # Style dla przycisków
│   ├── _forms.scss              # Style dla formularzy
│   ├── _cards.scss              # Style dla kart
│   ├── _modals.scss             # Style dla modali
│   ├── _navigation.scss         # Style dla nawigacji
│   ├── _tables.scss             # Style dla tabel
│   └── _index.scss              # Agregator komponentów
│
├── utilities/
│   ├── _mixins.scss             # Mixiny pomocnicze
│   ├── _functions.scss          # Funkcje SCSS
│   ├── _responsive.scss         # Mixiny responsywne
│   ├── _animations.scss         # Definicje animacji
│   └── _helpers.scss            # Klasy pomocnicze
│
├── themes/
│   ├── _default.scss            # Motyw domyślny (jasny)
│   ├── _dark.scss               # Motyw ciemny
│   ├── _custom-example.scss     # Przykład motywu custom
│   ├── _theme-mixins.scss       # Mixiny do zarządzania motywami
│   └── _theme-variables.scss    # Mapa struktur motywów
│
├── variables/
│   ├── _typography.scss         # Zmienne typograficzne
│   ├── _sizes.scss              # Zmienne rozmiarów
│   ├── _breakpoints.scss        # Punkty przełomowe
│   ├── _z-index.scss            # Warstwy z-index
│   ├── _borders.scss            # Border radius, width
│   ├── _shadows.scss            # Definicje cieni
│   └── _transitions.scss        # Czasy i funkcje przejść
│
└── index.scss                   # Główny plik importujący
```

### Konwencje Nazewnictwa Plików

- Pliki częściowe (partial) rozpoczynają się od `_`
- Nazwy w formacie kebab-case
- Grupy logiczne w podkatalogach
- Indeks agregujący w każdym katalogu z komponentami

---

## System Zmiennych

### 1. Kolory (`base/_colors.scss`)

#### Paleta Główna

```scss
// Primary - główny kolor marki
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

// Secondary - kolor akcentujący
$color-secondary-50: #fce4ec;
$color-secondary-100: #f8bbd0;
// ... (analogicznie 200-900)
$color-secondary-500: #e91e63; // Base

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

// Semantic colors
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

#### Kolory Semantyczne

```scss
// Text colors
$color-text-primary: $color-neutral-900;
$color-text-secondary: $color-neutral-700;
$color-text-disabled: $color-neutral-400;
$color-text-inverse: #ffffff;

// Background colors
$color-bg-default: #ffffff;
$color-bg-subtle: $color-neutral-50;
$color-bg-hover: $color-neutral-100;
$color-bg-active: $color-neutral-200;
$color-bg-disabled: $color-neutral-100;

// Border colors
$color-border-default: $color-neutral-300;
$color-border-hover: $color-neutral-400;
$color-border-focus: $color-primary-500;
$color-border-error: $color-error-500;
```

### 2. Typografia (`variables/_typography.scss`)

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

// Letter spacing
$letter-spacing-tighter: -0.05em;
$letter-spacing-tight: -0.025em;
$letter-spacing-normal: 0;
$letter-spacing-wide: 0.025em;
$letter-spacing-wider: 0.05em;
$letter-spacing-widest: 0.1em;
```

### 3. Spacing (`base/_spacing.scss`)

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
$spacing-44: 11rem; // 176px
$spacing-48: 12rem; // 192px
$spacing-52: 13rem; // 208px
$spacing-56: 14rem; // 224px
$spacing-60: 15rem; // 240px
$spacing-64: 16rem; // 256px
$spacing-72: 18rem; // 288px
$spacing-80: 20rem; // 320px
$spacing-96: 24rem; // 384px
```

### 4. Rozmiary (`variables/_sizes.scss`)

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

// Special sizes
$size-full: 100%;
$size-screen: 100vw;
$size-min: min-content;
$size-max: max-content;
$size-fit: fit-content;
```

### 5. Breakpoints (`variables/_breakpoints.scss`)

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
  2xl: $breakpoint-2xl,
);
```

### 6. Z-Index (`variables/_z-index.scss`)

```scss
// Layering system
$z-index-base: 0;
$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;
$z-index-notification: 1080;

// Z-index map
$z-layers: (
  base: $z-index-base,
  dropdown: $z-index-dropdown,
  sticky: $z-index-sticky,
  fixed: $z-index-fixed,
  modal-backdrop: $z-index-modal-backdrop,
  modal: $z-index-modal,
  popover: $z-index-popover,
  tooltip: $z-index-tooltip,
  notification: $z-index-notification,
);
```

### 7. Borders (`variables/_borders.scss`)

```scss
// Border widths
$border-width-0: 0;
$border-width-default: 1px;
$border-width-2: 2px;
$border-width-4: 4px;
$border-width-8: 8px;

// Border radius
$border-radius-none: 0;
$border-radius-sm: 0.125rem; // 2px
$border-radius-default: 0.25rem; // 4px
$border-radius-md: 0.375rem; // 6px
$border-radius-lg: 0.5rem; // 8px
$border-radius-xl: 0.75rem; // 12px
$border-radius-2xl: 1rem; // 16px
$border-radius-3xl: 1.5rem; // 24px
$border-radius-full: 9999px;
```

### 8. Shadows (`variables/_shadows.scss`)

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

### 9. Transitions (`variables/_transitions.scss`)

```scss
// Duration
$transition-duration-fast: 150ms;
$transition-duration-base: 200ms;
$transition-duration-slow: 300ms;
$transition-duration-slower: 500ms;

// Timing functions
$transition-timing-linear: linear;
$transition-timing-ease: ease;
$transition-timing-ease-in: ease-in;
$transition-timing-ease-out: ease-out;
$transition-timing-ease-in-out: ease-in-out;
$transition-timing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

// Common transitions
$transition-all: all $transition-duration-base $transition-timing-ease-in-out;
$transition-colors:
  color $transition-duration-base $transition-timing-ease-in-out,
  background-color $transition-duration-base $transition-timing-ease-in-out,
  border-color $transition-duration-base $transition-timing-ease-in-out;
$transition-transform: transform $transition-duration-base $transition-timing-ease-in-out;
$transition-opacity: opacity $transition-duration-base $transition-timing-ease-in-out;
```

---

## System Motywów

### Struktura Motywu (`themes/_theme-variables.scss`)

```scss
// Mapa definiująca strukturę motywu
$theme-structure: (
  colors: (
    primary: (
      50,
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
    ),
    secondary: (
      50,
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
    ),
    neutral: (
      50,
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
    ),
    success: (
      50,
      500,
      700,
    ),
    warning: (
      50,
      500,
      700,
    ),
    error: (
      50,
      500,
      700,
    ),
    info: (
      50,
      500,
      700,
    ),
    text: (
      primary,
      secondary,
      disabled,
      inverse,
    ),
    bg: (
      default,
      subtle,
      hover,
      active,
      disabled,
    ),
    border: (
      default,
      hover,
      focus,
      error,
    ),
  ),
  typography: (
    font-family: (
      primary,
      secondary,
      mono,
    ),
    font-size: (
      xs,
      sm,
      base,
      md,
      lg,
      xl,
      2xl,
      3xl,
      4xl,
      5xl,
    ),
    font-weight: (
      thin,
      light,
      normal,
      medium,
      semibold,
      bold,
      extrabold,
      black,
    ),
    line-height: (
      tight,
      snug,
      normal,
      relaxed,
      loose,
    ),
    letter-spacing: (
      tighter,
      tight,
      normal,
      wide,
      wider,
      widest,
    ),
  ),
  spacing: (
    0,
    px,
    0-5,
    1,
    1-5,
    2,
    2-5,
    3,
    3-5,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    12,
    14,
    16,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    72,
    80,
    96,
  ),
  sizes: (
    xs,
    sm,
    md,
    lg,
    xl,
    2xl,
    full,
    screen,
    min,
    max,
    fit,
  ),
  borders: (
    width: (
      0,
      default,
      2,
      4,
      8,
    ),
    radius: (
      none,
      sm,
      default,
      md,
      lg,
      xl,
      2xl,
      3xl,
      full,
    ),
  ),
  shadows: (
    none,
    sm,
    default,
    md,
    lg,
    xl,
    2xl,
    inner,
  ),
  transitions: (
    duration: (
      fast,
      base,
      slow,
      slower,
    ),
    timing: (
      linear,
      ease,
      ease-in,
      ease-out,
      ease-in-out,
      bounce,
    ),
  ),
  z-index: (
    base,
    dropdown,
    sticky,
    fixed,
    modal-backdrop,
    modal,
    popover,
    tooltip,
    notification,
  ),
);
```

### Motyw Domyślny (`themes/_default.scss`)

```scss
$theme-default: (
  name: 'default',
  colors: (
    primary: (
      50: #e3f2fd,
      100: #bbdefb,
      200: #90caf9,
      300: #64b5f6,
      400: #42a5f5,
      500: #2196f3,
      600: #1e88e5,
      700: #1976d2,
      800: #1565c0,
      900: #0d47a1,
    ),
    // ... pozostałe kolory
    text: (
        primary: #212121,
        secondary: #616161,
        disabled: #bdbdbd,
        inverse: #ffffff,
      ),
    bg: (
      default: #ffffff,
      subtle: #fafafa,
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
  ), // ... pozostałe właściwości
);
```

### Motyw Ciemny (`themes/_dark.scss`)

```scss
$theme-dark: (
  name: 'dark',
  colors: (
    primary: (
      50: #0d47a1,
      100: #1565c0,
      200: #1976d2,
      300: #1e88e5,
      400: #2196f3,
      500: #42a5f5,
      600: #64b5f6,
      700: #90caf9,
      800: #bbdefb,
      900: #e3f2fd,
    ),
    // ... pozostałe kolory (odwrócona paleta)
    text: (
        primary: #ffffff,
        secondary: #b0b0b0,
        disabled: #6b6b6b,
        inverse: #212121,
      ),
    bg: (
      default: #121212,
      subtle: #1e1e1e,
      hover: #2a2a2a,
      active: #363636,
      disabled: #1e1e1e,
    ),
    border: (
      default: #3a3a3a,
      hover: #4a4a4a,
      focus: #42a5f5,
      error: #f44336,
    ),
  ), // ... pozostałe właściwości
);
```

### Mixiny Motywów (`themes/_theme-mixins.scss`)

```scss
// Aktualny motyw (domyślnie light)
$current-theme: $theme-default !default;

// Pobierz wartość z motywu
@function theme-get($keys...) {
  $value: $current-theme;

  @each $key in $keys {
    @if type-of($value) == 'map' {
      $value: map-get($value, $key);
    } @else {
      @warn "Cannot get key '#{$key}' from non-map value";
      @return null;
    }
  }

  @return $value;
}

// Zastosuj właściwość z motywu
@mixin theme-prop($property, $keys...) {
  $value: theme-get($keys...);

  @if $value {
    #{$property}: $value;
  } @else {
    @warn "Theme value not found for keys: #{$keys}";
  }
}

// Zastosuj cały motyw
@mixin apply-theme($theme) {
  $current-theme: $theme !global;

  // Generuj CSS custom properties
  :root {
    @each $key, $value in $theme {
      @if type-of($value) == 'map' {
        @include generate-css-vars($key, $value);
      }
    }
  }
}

// Generuj CSS custom properties rekurencyjnie
@mixin generate-css-vars($prefix, $map) {
  @each $key, $value in $map {
    @if type-of($value) == 'map' {
      @include generate-css-vars('#{$prefix}-#{$key}', $value);
    } @else {
      --#{$prefix}-#{$key}: #{$value};
    }
  }
}

// Przełącz motyw w kontekście
@mixin with-theme($theme) {
  $previous-theme: $current-theme;
  $current-theme: $theme !global;
  @content;
  $current-theme: $previous-theme !global;
}

// Wygeneruj klasy dla kolorów motywu
@mixin theme-color-classes() {
  $colors: theme-get('colors');

  @each $color-name, $shades in $colors {
    @if type-of($shades) == 'map' {
      @each $shade, $value in $shades {
        .text-#{$color-name}-#{$shade} {
          color: $value;
        }

        .bg-#{$color-name}-#{$shade} {
          background-color: $value;
        }

        .border-#{$color-name}-#{$shade} {
          border-color: $value;
        }
      }
    }
  }
}
```

### Przykład Użycia Motywów

```scss
// W komponencie
.my-button {
  @include theme-prop(color, colors, text, primary);
  @include theme-prop(background-color, colors, primary, 500);
  @include theme-prop(border-radius, borders, radius, default);

  &:hover {
    @include theme-prop(background-color, colors, primary, 600);
  }
}

// Przełączanie motywów
.app {
  @include apply-theme($theme-default);

  &[data-theme='dark'] {
    @include apply-theme($theme-dark);
  }
}
```

---

## Mixiny i Funkcje

### Layout Mixiny (`utilities/_mixins.scss`)

```scss
// Flex center
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Flex between
@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// Grid responsywny
@mixin grid-responsive($columns: 4, $gap: $spacing-4) {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;

  @include respond-to(md) {
    grid-template-columns: repeat(calc($columns / 2), 1fr);
  }

  @include respond-to(sm) {
    grid-template-columns: 1fr;
  }
}

// Kontener z max-width
@mixin container($max-width: $container-xl, $padding: $spacing-4) {
  max-width: $max-width;
  margin-left: auto;
  margin-right: auto;
  padding-left: $padding;
  padding-right: $padding;
}

// Absolute center
@mixin absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// Aspect ratio
@mixin aspect-ratio($width, $height) {
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-top: calc($height / $width * 100%);
  }
}

// Truncate text
@mixin truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Multiline truncate
@mixin line-clamp($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Komponentowe Mixiny

```scss
// Warianty przycisków
@mixin button-variant($color, $background, $border: $background) {
  color: $color;
  background-color: $background;
  border-color: $border;

  &:hover:not(:disabled) {
    background-color: darken($background, 10%);
    border-color: darken($border, 10%);
  }

  &:active:not(:disabled) {
    background-color: darken($background, 15%);
    border-color: darken($border, 15%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// Outline button
@mixin button-outline($color) {
  color: $color;
  background-color: transparent;
  border-color: $color;

  &:hover:not(:disabled) {
    color: white;
    background-color: $color;
  }
}

// Focus dla inputów
@mixin input-focus($color: theme-get(colors, primary, 500)) {
  &:focus {
    outline: none;
    border-color: $color;
    box-shadow: 0 0 0 3px rgba($color, 0.1);
  }
}

// Cienie dla kart
@mixin card-shadow($level: 2) {
  @if $level == 1 {
    box-shadow: $elevation-1;
  } @else if $level == 2 {
    box-shadow: $elevation-2;
  } @else if $level == 3 {
    box-shadow: $elevation-3;
  } @else if $level == 4 {
    box-shadow: $elevation-4;
  } @else if $level == 5 {
    box-shadow: $elevation-5;
  }

  transition: box-shadow $transition-duration-base $transition-timing-ease;
}

// Hover lift effect
@mixin hover-lift($translateY: -2px, $shadow-level: 3) {
  transition:
    transform $transition-duration-base $transition-timing-ease,
    box-shadow $transition-duration-base $transition-timing-ease;

  &:hover {
    transform: translateY($translateY);
    @include card-shadow($shadow-level);
  }
}

// Badge/pill style
@mixin badge($bg-color, $text-color: white) {
  display: inline-flex;
  align-items: center;
  padding: $spacing-1 $spacing-2;
  border-radius: $border-radius-full;
  background-color: $bg-color;
  color: $text-color;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  line-height: 1;
}
```

### Responsywne Mixiny (`utilities/_responsive.scss`)

```scss
// Media query helper
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn "Breakpoint '#{$breakpoint}' not found in $breakpoints map";
  }
}

// Max-width media query
@mixin respond-below($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (max-width: map-get($breakpoints, $breakpoint) - 1px) {
      @content;
    }
  } @else {
    @warn "Breakpoint '#{$breakpoint}' not found in $breakpoints map";
  }
}

// Between two breakpoints
@mixin respond-between($lower, $upper) {
  @if map-has-key($breakpoints, $lower) and map-has-key($breakpoints, $upper) {
    @media (min-width: map-get($breakpoints, $lower)) and (max-width: map-get($breakpoints, $upper) - 1px) {
      @content;
    }
  }
}

// Responsywna właściwość
@mixin responsive-property($property, $values) {
  // Base value (mobile)
  @if map-has-key($values, base) {
    #{$property}: map-get($values, base);
  }

  // Responsive values
  @each $breakpoint, $value in $values {
    @if $breakpoint != base {
      @include respond-to($breakpoint) {
        #{$property}: $value;
      }
    }
  }
}

// Hide/show at breakpoints
@mixin hide-from($breakpoint) {
  @include respond-to($breakpoint) {
    display: none !important;
  }
}

@mixin show-from($breakpoint) {
  display: none !important;

  @include respond-to($breakpoint) {
    display: initial !important;
  }
}

// Responsive font size with fluid scaling
@mixin fluid-font($min-size, $max-size, $min-vw: 320px, $max-vw: 1200px) {
  font-size: $min-size;

  @media (min-width: $min-vw) and (max-width: $max-vw) {
    font-size: calc(
      #{$min-size} + #{strip-unit($max-size - $min-size)} *
        ((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)})
    );
  }

  @media (min-width: $max-vw) {
    font-size: $max-size;
  }
}
```

### Utility Mixiny

```scss
// Visually hidden (accessibility)
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// Focus visible (keyboard only)
@mixin focus-visible {
  &:focus-visible {
    outline: 2px solid theme-get(colors, primary, 500);
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}

// Smooth transitions
@mixin transition($properties...) {
  $transitions: ();

  @each $property in $properties {
    $transitions: append(
      $transitions,
      $property $transition-duration-base $transition-timing-ease-in-out,
      comma
    );
  }

  transition: $transitions;
}

// Clearfix
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

// Hardware acceleration
@mixin hardware-accelerate {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

// Custom scrollbar
@mixin custom-scrollbar($track-bg: $color-neutral-100, $thumb-bg: $color-neutral-400) {
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: $track-bg;
  }

  &::-webkit-scrollbar-thumb {
    background: $thumb-bg;
    border-radius: $border-radius-full;

    &:hover {
      background: darken($thumb-bg, 10%);
    }
  }

  // Firefox
  scrollbar-width: thin;
  scrollbar-color: $thumb-bg $track-bg;
}

// Reset list
@mixin reset-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

// Reset button
@mixin reset-button {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

// Selection style
@mixin selection($bg-color: theme-get(colors, primary, 500), $text-color: white) {
  ::selection {
    background-color: $bg-color;
    color: $text-color;
  }

  ::-moz-selection {
    background-color: $bg-color;
    color: $text-color;
  }
}
```

### Funkcje (`utilities/_functions.scss`)

```scss
// Strip unit from value
@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
}

// Convert px to rem
@function rem($pixels, $context: 16) {
  @if unitless($pixels) {
    $pixels: $pixels * 1px;
  }

  @if unitless($context) {
    $context: $context * 1px;
  }

  @return $pixels / $context * 1rem;
}

// Convert px to em
@function em($pixels, $context: 16) {
  @if unitless($pixels) {
    $pixels: $pixels * 1px;
  }

  @if unitless($context) {
    $context: $context * 1px;
  }

  @return $pixels / $context * 1em;
}

// Lighten color (tint)
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

// Darken color (shade)
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}

// Calculate contrast color (black or white)
@function contrast-color($color, $light: white, $dark: black) {
  $r: red($color);
  $g: green($color);
  $b: blue($color);

  $yiq: (($r * 299) + ($g * 587) + ($b * 114)) / 1000;

  @return if($yiq >= 128, $dark, $light);
}

// Get z-index from map
@function z($layer) {
  @if map-has-key($z-layers, $layer) {
    @return map-get($z-layers, $layer);
  }

  @warn "Z-index layer '#{$layer}' not found";
  @return 0;
}

// Get breakpoint value
@function breakpoint($name) {
  @if map-has-key($breakpoints, $name) {
    @return map-get($breakpoints, $name);
  }

  @warn "Breakpoint '#{$name}' not found";
  @return null;
}

// Get next breakpoint
@function breakpoint-next($name) {
  $breakpoint-names: map-keys($breakpoints);
  $n: index($breakpoint-names, $name);

  @if $n != null and $n < length($breakpoint-names) {
    @return nth($breakpoint-names, $n + 1);
  }

  @return null;
}

// Get minimum breakpoint width
@function breakpoint-min($name) {
  $min: breakpoint($name);
  @return if($min != 0, $min, null);
}

// Get maximum breakpoint width
@function breakpoint-max($name) {
  $next: breakpoint-next($name);
  @return if($next, breakpoint($next) - 0.02, null);
}

// Deep map get
@function map-deep-get($map, $keys...) {
  @each $key in $keys {
    $map: map-get($map, $key);
  }
  @return $map;
}
```

### Animacje (`utilities/_animations.scss`)

```scss
// Keyframes definitions
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

@keyframes slide-in-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-down {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-left {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

// Animation mixins
@mixin animate(
  $name,
  $duration: $transition-duration-base,
  $timing: $transition-timing-ease,
  $delay: 0s,
  $iteration: 1,
  $direction: normal,
  $fill-mode: both
) {
  animation-name: $name;
  animation-duration: $duration;
  animation-timing-function: $timing;
  animation-delay: $delay;
  animation-iteration-count: $iteration;
  animation-direction: $direction;
  animation-fill-mode: $fill-mode;
}
```

---

## Architektura Komponentów

### Struktura Komponentu

Każdy komponent powinien przestrzegać następującej struktury:

```scss
// components/_buttons.scss

.btn {
  // Base styles (wymagane)
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-2 $spacing-4;
  border: $border-width-default solid transparent;
  border-radius: $border-radius-default;
  font-family: $font-family-primary;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  line-height: $line-height-normal;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  @include transition(all);
  @include focus-visible;

  // Variants (warianty kolorystyczne)
  &--primary {
    @include button-variant(theme-get(colors, text, inverse), theme-get(colors, primary, 500));
  }

  &--secondary {
    @include button-variant(theme-get(colors, text, inverse), theme-get(colors, secondary, 500));
  }

  &--outline {
    @include button-outline(theme-get(colors, primary, 500));
  }

  &--ghost {
    background-color: transparent;
    border-color: transparent;

    &:hover {
      @include theme-prop(background-color, colors, bg, hover);
    }
  }

  // Sizes (rozmiary)
  &--xs {
    padding: $spacing-1 $spacing-2;
    font-size: $font-size-xs;
  }

  &--sm {
    padding: $spacing-1-5 $spacing-3;
    font-size: $font-size-sm;
  }

  &--md {
    // Default size
  }

  &--lg {
    padding: $spacing-3 $spacing-6;
    font-size: $font-size-lg;
  }

  &--xl {
    padding: $spacing-4 $spacing-8;
    font-size: $font-size-xl;
  }

  // States (stany)
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--loading {
    position: relative;
    color: transparent;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1em;
      height: 1em;
      margin-top: -0.5em;
      margin-left: -0.5em;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: rotate 0.6s linear infinite;
    }
  }

  // Modifiers (modyfikatory)
  &--full-width {
    width: 100%;
  }

  &--icon-only {
    padding: $spacing-2;

    &.btn--sm {
      padding: $spacing-1-5;
    }

    &.btn--lg {
      padding: $spacing-3;
    }
  }

  // Elements (elementy potomne)
  &__icon {
    display: inline-flex;
    margin-right: $spacing-2;

    &--right {
      margin-right: 0;
      margin-left: $spacing-2;
    }
  }

  // Responsive
  @include respond-to(sm) {
    font-size: $font-size-sm;
    padding: $spacing-2 $spacing-3;
  }
}

// Button group
.btn-group {
  display: inline-flex;

  .btn {
    border-radius: 0;

    &:first-child {
      border-top-left-radius: $border-radius-default;
      border-bottom-left-radius: $border-radius-default;
    }

    &:last-child {
      border-top-right-radius: $border-radius-default;
      border-bottom-right-radius: $border-radius-default;
    }

    &:not(:last-child) {
      border-right-width: 0;
    }
  }
}
```

### Konwencje Nazewnictwa (BEM)

```scss
// Block
.card {
}

// Element
.card__header {
}
.card__body {
}
.card__footer {
}

// Modifier
.card--elevated {
}
.card--bordered {
}

// Element with modifier
.card__header--sticky {
}

// State (z prefiksem is-/has-)
.card.is-active {
}
.card.has-shadow {
}
```

### Przykłady Komponentów

#### Forms (`components/_forms.scss`)

```scss
.form-group {
  margin-bottom: $spacing-4;
}

.form-label {
  display: block;
  margin-bottom: $spacing-2;
  @include theme-prop(color, colors, text, primary);
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;

  &--required::after {
    content: '*';
    margin-left: $spacing-1;
    color: theme-get(colors, error, 500);
  }
}

.form-input {
  width: 100%;
  padding: $spacing-2 $spacing-3;
  border: $border-width-default solid theme-get(colors, border, default);
  border-radius: $border-radius-default;
  @include theme-prop(background-color, colors, bg, default);
  @include theme-prop(color, colors, text, primary);
  font-family: $font-family-primary;
  font-size: $font-size-base;
  line-height: $line-height-normal;
  @include transition(border-color, box-shadow);
  @include input-focus;

  &::placeholder {
    @include theme-prop(color, colors, text, disabled);
  }

  &:disabled {
    @include theme-prop(background-color, colors, bg, disabled);
    cursor: not-allowed;
  }

  &--error {
    border-color: theme-get(colors, error, 500);

    &:focus {
      box-shadow: 0 0 0 3px rgba(theme-get(colors, error, 500), 0.1);
    }
  }

  &--success {
    border-color: theme-get(colors, success, 500);
  }
}

.form-textarea {
  @extend .form-input;
  resize: vertical;
  min-height: 100px;
}

.form-select {
  @extend .form-input;
  padding-right: $spacing-8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right $spacing-3 center;
  background-size: 12px;
  appearance: none;
}

.form-checkbox,
.form-radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  input {
    @include visually-hidden;
  }

  &__box {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: $spacing-2;
    border: $border-width-2 solid theme-get(colors, border, default);
    border-radius: $border-radius-sm;
    @include transition(all);

    &::after {
      content: '';
      position: absolute;
      display: none;
    }
  }

  input:checked ~ &__box {
    background-color: theme-get(colors, primary, 500);
    border-color: theme-get(colors, primary, 500);

    &::after {
      display: block;
    }
  }

  input:focus-visible ~ &__box {
    @include focus-visible;
  }
}

.form-checkbox__box::after {
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.form-radio__box {
  border-radius: 50%;

  &::after {
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
  }
}

.form-help {
  display: block;
  margin-top: $spacing-1;
  font-size: $font-size-sm;
  @include theme-prop(color, colors, text, secondary);
}

.form-error {
  @extend .form-help;
  color: theme-get(colors, error, 500);
}
```

#### Cards (`components/_cards.scss`)

```scss
.card {
  @include theme-prop(background-color, colors, bg, default);
  border-radius: $border-radius-lg;
  overflow: hidden;
  @include transition(box-shadow, transform);

  &--elevated {
    @include card-shadow(2);

    &:hover {
      @include hover-lift;
    }
  }

  &--bordered {
    border: $border-width-default solid theme-get(colors, border, default);
  }

  &--flat {
    @include theme-prop(background-color, colors, bg, subtle);
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__header {
    padding: $spacing-4;
    border-bottom: $border-width-default solid theme-get(colors, border, default);
  }

  &__title {
    margin: 0;
    @include theme-prop(color, colors, text, primary);
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
  }

  &__subtitle {
    margin: $spacing-1 0 0;
    @include theme-prop(color, colors, text, secondary);
    font-size: $font-size-sm;
  }

  &__body {
    padding: $spacing-4;
  }

  &__footer {
    padding: $spacing-4;
    border-top: $border-width-default solid theme-get(colors, border, default);
    @include theme-prop(background-color, colors, bg, subtle);
  }

  &--horizontal {
    display: flex;

    .card__image {
      width: 40%;
      object-fit: cover;
    }

    .card__content {
      flex: 1;
    }

    @include respond-below(md) {
      flex-direction: column;

      .card__image {
        width: 100%;
      }
    }
  }
}
```

---

## Przewodnik Implementacji

### Krok 1: Inicjalizacja Struktury

```bash
# Utworzenie struktury katalogów
mkdir -p src/styles/{base,components,utilities,themes,variables}

# Utworzenie głównych plików
touch src/styles/index.scss
touch src/styles/base/{_reset.scss,_typography.scss,_colors.scss,_spacing.scss}
touch src/styles/utilities/{_mixins.scss,_functions.scss,_responsive.scss,_animations.scss,_helpers.scss}
touch src/styles/variables/{_typography.scss,_sizes.scss,_breakpoints.scss,_z-index.scss,_borders.scss,_shadows.scss,_transitions.scss}
touch src/styles/themes/{_default.scss,_dark.scss,_theme-mixins.scss,_theme-variables.scss}
```

### Krok 2: Główny Plik Index (`index.scss`)

```scss
// ==========================================================================
// Main Styles Entry Point
// ==========================================================================

// 1. Variables (muszą być pierwsze)
@import 'variables/breakpoints';
@import 'variables/typography';
@import 'variables/sizes';
@import 'variables/z-index';
@import 'variables/borders';
@import 'variables/shadows';
@import 'variables/transitions';

// 2. Functions (przed mixinami)
@import 'utilities/functions';

// 3. Theme System
@import 'themes/theme-variables';
@import 'themes/default';
@import 'themes/dark';
@import 'themes/theme-mixins';

// 4. Mixins
@import 'utilities/mixins';
@import 'utilities/responsive';
@import 'utilities/animations';

// 5. Base Styles
@import 'base/reset';
@import 'base/colors';
@import 'base/spacing';
@import 'base/typography';

// 6. Components
@import 'components/buttons';
@import 'components/forms';
@import 'components/cards';
@import 'components/modals';
@import 'components/navigation';
@import 'components/tables';

// 7. Utilities (ostatnie, najwyższy priorytet)
@import 'utilities/helpers';

// 8. Apply default theme
@include apply-theme($theme-default);
```

### Krok 3: Reset CSS (`base/_reset.scss`)

```scss
// Modern CSS Reset
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  line-height: $line-height-normal;
  text-rendering: optimizeSpeed;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

ul[role='list'],
ol[role='list'] {
  list-style: none;
}

#root,
#__next {
  isolation: isolate;
}
```

### Krok 4: Base Typography (`base/_typography.scss`)

```scss
body {
  font-family: $font-family-primary;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  line-height: $line-height-normal;
  @include theme-prop(color, colors, text, primary);
  @include theme-prop(background-color, colors, bg, default);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  @include theme-prop(color, colors, text, primary);
}

h1 {
  font-size: $font-size-4xl;
}
h2 {
  font-size: $font-size-3xl;
}
h3 {
  font-size: $font-size-2xl;
}
h4 {
  font-size: $font-size-xl;
}
h5 {
  font-size: $font-size-lg;
}
h6 {
  font-size: $font-size-md;
}

p {
  margin-bottom: $spacing-4;
}

a {
  @include theme-prop(color, colors, primary, 500);
  @include transition(color);

  &:hover {
    @include theme-prop(color, colors, primary, 700);
  }
}

strong,
b {
  font-weight: $font-weight-bold;
}

em,
i {
  font-style: italic;
}

code {
  font-family: $font-family-mono;
  font-size: 0.9em;
  padding: $spacing-0-5 $spacing-1;
  border-radius: $border-radius-sm;
  @include theme-prop(background-color, colors, neutral, 100);
  @include theme-prop(color, colors, error, 600);
}

pre {
  font-family: $font-family-mono;
  padding: $spacing-4;
  border-radius: $border-radius-default;
  @include theme-prop(background-color, colors, neutral, 900);
  overflow-x: auto;

  code {
    padding: 0;
    background: none;
    color: theme-get(colors, neutral, 50);
  }
}
```

### Krok 5: Helper Classes (`utilities/_helpers.scss`)

```scss
// Display
.d-block {
  display: block;
}
.d-inline-block {
  display: inline-block;
}
.d-inline {
  display: inline;
}
.d-flex {
  display: flex;
}
.d-inline-flex {
  display: inline-flex;
}
.d-grid {
  display: grid;
}
.d-none {
  display: none;
}

// Flex
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-nowrap {
  flex-wrap: nowrap;
}

.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-around {
  justify-content: space-around;
}
.justify-evenly {
  justify-content: space-evenly;
}

.align-start {
  align-items: flex-start;
}
.align-end {
  align-items: flex-end;
}
.align-center {
  align-items: center;
}
.align-baseline {
  align-items: baseline;
}
.align-stretch {
  align-items: stretch;
}

.flex-1 {
  flex: 1;
}
.flex-auto {
  flex: auto;
}
.flex-none {
  flex: none;
}

// Grid
.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}
.grid-cols-5 {
  grid-template-columns: repeat(5, 1fr);
}
.grid-cols-6 {
  grid-template-columns: repeat(6, 1fr);
}
.grid-cols-12 {
  grid-template-columns: repeat(12, 1fr);
}

.gap-0 {
  gap: $spacing-0;
}
.gap-1 {
  gap: $spacing-1;
}
.gap-2 {
  gap: $spacing-2;
}
.gap-3 {
  gap: $spacing-3;
}
.gap-4 {
  gap: $spacing-4;
}
.gap-5 {
  gap: $spacing-5;
}
.gap-6 {
  gap: $spacing-6;
}
.gap-8 {
  gap: $spacing-8;
}

// Position
.position-static {
  position: static;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.position-fixed {
  position: fixed;
}
.position-sticky {
  position: sticky;
}

// Text alignment
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-justify {
  text-align: justify;
}

// Text transform
.text-uppercase {
  text-transform: uppercase;
}
.text-lowercase {
  text-transform: lowercase;
}
.text-capitalize {
  text-transform: capitalize;
}
.text-normal {
  text-transform: none;
}

// Font weight
.font-thin {
  font-weight: $font-weight-thin;
}
.font-light {
  font-weight: $font-weight-light;
}
.font-normal {
  font-weight: $font-weight-normal;
}
.font-medium {
  font-weight: $font-weight-medium;
}
.font-semibold {
  font-weight: $font-weight-semibold;
}
.font-bold {
  font-weight: $font-weight-bold;
}
.font-extrabold {
  font-weight: $font-weight-extrabold;
}
.font-black {
  font-weight: $font-weight-black;
}

// Font size
.text-xs {
  font-size: $font-size-xs;
}
.text-sm {
  font-size: $font-size-sm;
}
.text-base {
  font-size: $font-size-base;
}
.text-md {
  font-size: $font-size-md;
}
.text-lg {
  font-size: $font-size-lg;
}
.text-xl {
  font-size: $font-size-xl;
}
.text-2xl {
  font-size: $font-size-2xl;
}
.text-3xl {
  font-size: $font-size-3xl;
}
.text-4xl {
  font-size: $font-size-4xl;
}
.text-5xl {
  font-size: $font-size-5xl;
}

// Spacing utilities (padding)
@each $key,
  $value
    in (
      0: $spacing-0,
      1: $spacing-1,
      2: $spacing-2,
      3: $spacing-3,
      4: $spacing-4,
      5: $spacing-5,
      6: $spacing-6,
      8: $spacing-8,
      10: $spacing-10,
      12: $spacing-12,
      16: $spacing-16,
      20: $spacing-20,
      24: $spacing-24
    )
{
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

// Spacing utilities (margin)
@each $key,
  $value
    in (
      0: $spacing-0,
      1: $spacing-1,
      2: $spacing-2,
      3: $spacing-3,
      4: $spacing-4,
      5: $spacing-5,
      6: $spacing-6,
      8: $spacing-8,
      10: $spacing-10,
      12: $spacing-12,
      16: $spacing-16,
      20: $spacing-20,
      24: $spacing-24,
      auto: auto
    )
{
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
}

// Width
.w-full {
  width: 100%;
}
.w-screen {
  width: 100vw;
}
.w-auto {
  width: auto;
}
.w-fit {
  width: fit-content;
}

// Height
.h-full {
  height: 100%;
}
.h-screen {
  height: 100vh;
}
.h-auto {
  height: auto;
}
.h-fit {
  height: fit-content;
}

// Overflow
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-visible {
  overflow: visible;
}
.overflow-scroll {
  overflow: scroll;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}

// Border radius
.rounded-none {
  border-radius: $border-radius-none;
}
.rounded-sm {
  border-radius: $border-radius-sm;
}
.rounded {
  border-radius: $border-radius-default;
}
.rounded-md {
  border-radius: $border-radius-md;
}
.rounded-lg {
  border-radius: $border-radius-lg;
}
.rounded-xl {
  border-radius: $border-radius-xl;
}
.rounded-2xl {
  border-radius: $border-radius-2xl;
}
.rounded-3xl {
  border-radius: $border-radius-3xl;
}
.rounded-full {
  border-radius: $border-radius-full;
}

// Shadow
.shadow-none {
  box-shadow: $shadow-none;
}
.shadow-sm {
  box-shadow: $shadow-sm;
}
.shadow {
  box-shadow: $shadow-default;
}
.shadow-md {
  box-shadow: $shadow-md;
}
.shadow-lg {
  box-shadow: $shadow-lg;
}
.shadow-xl {
  box-shadow: $shadow-xl;
}
.shadow-2xl {
  box-shadow: $shadow-2xl;
}
.shadow-inner {
  box-shadow: $shadow-inner;
}

// Visibility
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.sr-only {
  @include visually-hidden;
}

// Opacity
.opacity-0 {
  opacity: 0;
}
.opacity-25 {
  opacity: 0.25;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-75 {
  opacity: 0.75;
}
.opacity-100 {
  opacity: 1;
}

// Cursor
.cursor-auto {
  cursor: auto;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.cursor-move {
  cursor: move;
}
.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}

// Pointer events
.pointer-events-none {
  pointer-events: none;
}
.pointer-events-auto {
  pointer-events: auto;
}

// User select
.select-none {
  user-select: none;
}
.select-text {
  user-select: text;
}
.select-all {
  user-select: all;
}
.select-auto {
  user-select: auto;
}

// Responsive utilities
@each $breakpoint in map-keys($breakpoints) {
  @include respond-to($breakpoint) {
    .#{$breakpoint}\:block {
      display: block;
    }
    .#{$breakpoint}\:flex {
      display: flex;
    }
    .#{$breakpoint}\:grid {
      display: grid;
    }
    .#{$breakpoint}\:hidden {
      display: none;
    }

    .#{$breakpoint}\:flex-row {
      flex-direction: row;
    }
    .#{$breakpoint}\:flex-col {
      flex-direction: column;
    }

    .#{$breakpoint}\:text-left {
      text-align: left;
    }
    .#{$breakpoint}\:text-center {
      text-align: center;
    }
    .#{$breakpoint}\:text-right {
      text-align: right;
    }
  }
}
```

---

## Integracja z Projektem

### 1. Konfiguracja Build Tools

#### Vite Configuration (`vite.config.js`)

```javascript
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/variables/_breakpoints.scss";
          @import "@/styles/variables/_typography.scss";
          @import "@/styles/utilities/_functions.scss";
          @import "@/styles/utilities/_mixins.scss";
        `,
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@styles': '/src/styles',
    },
  },
});
```

#### Package.json Dependencies

```json
{
  "devDependencies": {
    "sass": "^1.70.0",
    "stylelint": "^16.0.0",
    "stylelint-config-standard-scss": "^13.0.0",
    "stylelint-order": "^6.0.0"
  }
}
```

### 2. Theme Provider Component

#### ThemeContext.jsx

```javascript
import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load from localStorage or default
    const saved = localStorage.getItem('theme');
    return saved || 'default';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'default' ? 'dark' : 'default'));
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

#### App Usage

```javascript
import { ThemeProvider } from './contexts/ThemeContext';
import '@styles/index.scss';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 3. Theme Switcher Component

```javascript
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className='btn btn--ghost btn--icon-only'
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'default' ? 'dark' : 'light'} theme`}
    >
      {theme === 'default' ? '🌙' : '☀️'}
    </button>
  );
};
```

### 4. CSS Modules Integration (Opcjonalne)

```scss
// Component.module.scss
@import '@styles/utilities/mixins';
@import '@styles/utilities/functions';

.container {
  @include container($container-lg);
  @include theme-prop(background-color, colors, bg, default);

  @include respond-to(md) {
    padding: $spacing-8;
  }
}

.card {
  @include card-shadow(2);
  @include hover-lift;

  &:hover {
    @include card-shadow(4);
  }
}
```

### 5. Import w Komponentach

```javascript
// Komponent używający modułów CSS
import styles from './Component.module.scss';

export const Component = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>Content</div>
    </div>
  );
};

// Komponent używający utility classes
export const UtilityComponent = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='card shadow-lg rounded-lg p-6'>
        <h2 className='text-2xl font-bold mb-4'>Title</h2>
        <p className='text-base text-gray-700'>Content</p>
      </div>
    </div>
  );
};
```

---

## Best Practices

### 1. Organizacja Kodu

#### ✅ Dobre Praktyki

```scss
// Używaj zmiennych z systemu
.component {
  padding: $spacing-4; // ✅
  color: theme-get(colors, text, primary); // ✅
}

// Grupuj powiązane właściwości
.component {
  // Positioning
  position: relative;
  top: 0;

  // Box model
  display: flex;
  width: 100%;
  padding: $spacing-4;

  // Typography
  font-size: $font-size-base;
  line-height: $line-height-normal;

  // Visual
  background-color: white;
  border-radius: $border-radius-default;

  // Animation
  transition: $transition-all;
}

// Używaj mixinów dla powtarzalnych wzorców
.button {
  @include flex-center; // ✅
  @include transition(background-color, transform); // ✅
}
```

#### ❌ Złe Praktyki

```scss
// Nie hardkoduj wartości
.component {
  padding: 16px; // ❌
  color: #212121; // ❌
}

// Nie duplikuj kodu
.button-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  // ... (20 linii)
}

.button-secondary {
  display: flex; // ❌ Duplikacja
  align-items: center; // ❌
  justify-content: center; // ❌
  // ... (20 linii)
}

// Zamiast tego użyj mixina
.button-primary {
  @include flex-center; // ✅
}
```

### 2. Nazewnictwo

```scss
// Używaj BEM dla struktur komponentów
.card {
} // Block
.card__header {
} // Element
.card--elevated {
} // Modifier
.card__header--sticky {
} // Element + Modifier

// Stany z prefiksami
.button.is-active {
}
.form.has-error {
}
.modal.is-open {
}

// Utility classes bez BEM
.flex {
}
.text-center {
}
.mb-4 {
}
```

### 3. Responsywność

```scss
// Mobile-first approach
.component {
  // Mobile styles (base)
  font-size: $font-size-sm;
  padding: $spacing-2;

  // Tablet and up
  @include respond-to(md) {
    font-size: $font-size-base;
    padding: $spacing-4;
  }

  // Desktop and up
  @include respond-to(lg) {
    font-size: $font-size-lg;
    padding: $spacing-6;
  }
}

// Używaj responsive mixins
.grid {
  @include grid-responsive(4, $spacing-6);
}
```

### 4. Wydajność

```scss
// ✅ Minimalizuj zagnieżdżenia (max 3 poziomy)
.card {
  .card__header {
    .card__title {
      // OK - 3 poziomy
    }
  }
}

// ❌ Unikaj nadmiernego zagnieżdżenia
.nav {
  .nav__list {
    .nav__item {
      .nav__link {
        .nav__icon {
          // ❌ Za głęboko
        }
      }
    }
  }
}

// ✅ Używaj selektorów bezpośrednich gdzie możliwe
.card {
  > .card__header {
    // Bezpośredni potomek
    // ...
  }
}

// ✅ Grupuj media queries
.component {
  font-size: $font-size-sm;
  padding: $spacing-2;

  @include respond-to(md) {
    font-size: $font-size-base;
    padding: $spacing-4;
    margin: $spacing-6; // Zgrupowane w jednym MQ
  }
}
```

### 5. Dostępność

```scss
// Focus states zawsze
.button {
  @include focus-visible; // ✅

  &:focus {
    outline: 2px solid theme-get(colors, primary, 500);
  }
}

// Odpowiedni kontrast
.text-on-primary {
  color: contrast-color(theme-get(colors, primary, 500)); // ✅
}

// Skip links
.skip-link {
  @include visually-hidden; // ✅

  &:focus {
    position: static;
    width: auto;
    height: auto;
  }
}

// Stany dla screen readers
.loading {
  &::before {
    content: 'Loading...';
    @include visually-hidden;
  }
}
```

### 6. Themowanie

```scss
// Zawsze używaj theme-aware properties
.component {
  @include theme-prop(color, colors, text, primary); // ✅
  @include theme-prop(background-color, colors, bg, default); // ✅
}

// Dla custom values używaj CSS variables
:root {
  --component-spacing: #{$spacing-4};
  --component-radius: #{$border-radius-lg};
}

.component {
  padding: var(--component-spacing);
  border-radius: var(--component-radius);
}

// Testuj oba motywy
.component {
  @include with-theme($theme-default) {
    // Test z jasnym motywem
  }

  @include with-theme($theme-dark) {
    // Test z ciemnym motywem
  }
}
```

---

## Narzędzia Deweloperskie

### 1. Stylelint Configuration (`.stylelintrc.json`)

```json
{
  "extends": ["stylelint-config-standard-scss"],
  "plugins": ["stylelint-order"],
  "rules": {
    "order/properties-alphabetical-order": null,
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "display",
      "flex",
      "flex-direction",
      "justify-content",
      "align-items",
      "width",
      "height",
      "padding",
      "margin",
      "font-family",
      "font-size",
      "font-weight",
      "line-height",
      "color",
      "background-color",
      "border",
      "border-radius",
      "box-shadow",
      "transition",
      "transform"
    ],
    "selector-class-pattern": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["tailwind"]
      }
    ],
    "max-nesting-depth": 3,
    "selector-max-compound-selectors": 4,
    "declaration-no-important": true,
    "color-no-hex": null,
    "color-named": "never"
  }
}
```

### 2. Scripts w Package.json

```json
{
  "scripts": {
    "lint:css": "stylelint \"src/**/*.{css,scss}\"",
    "lint:css:fix": "stylelint \"src/**/*.{css,scss}\" --fix",
    "build:css": "sass src/styles/index.scss dist/styles.css --style compressed",
    "watch:css": "sass src/styles/index.scss dist/styles.css --watch"
  }
}
```

### 3. VS Code Settings (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "css.validate": false,
  "scss.validate": false,
  "stylelint.enable": true,
  "stylelint.validate": ["css", "scss"],
  "files.associations": {
    "*.scss": "scss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "scss.scannerExclude": ["**/.git", "**/node_modules", "**/dist"]
}
```

### 4. Dokumentacja Storybook

#### `.storybook/preview.js`

```javascript
import '@styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      icon: 'circlehollow',
      items: ['default', 'dark'],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;

    return (
      <div data-theme={theme} style={{ padding: '2rem' }}>
        <Story />
      </div>
    );
  },
];
```

#### Button.stories.jsx

```javascript
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

const Template = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

export const AllVariants = () => (
  <div className='flex gap-4'>
    <Button variant='primary'>Primary</Button>
    <Button variant='secondary'>Secondary</Button>
    <Button variant='outline'>Outline</Button>
    <Button variant='ghost'>Ghost</Button>
  </div>
);

export const AllSizes = () => (
  <div className='flex gap-4 align-center'>
    <Button size='xs'>XS</Button>
    <Button size='sm'>SM</Button>
    <Button size='md'>MD</Button>
    <Button size='lg'>LG</Button>
    <Button size='xl'>XL</Button>
  </div>
);
```

### 5. Testing Utilities

#### theme-test-utils.js

```javascript
export const testThemeValues = (component, theme) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);

  const computed = getComputedStyle(component);
  return {
    backgroundColor: computed.backgroundColor,
    color: computed.color,
    borderColor: computed.borderColor,
  };
};

export const testResponsive = (component, breakpoint) => {
  // Symuluj różne szerokości ekranu
  window.innerWidth = breakpoint;
  window.dispatchEvent(new Event('resize'));

  return getComputedStyle(component);
};
```

---

## Przykłady Użycia

### 1. Komponent z Pełnym Themowaniem

```scss
// components/Alert.scss
.alert {
  padding: $spacing-4;
  border-radius: $border-radius-default;
  border-left: 4px solid;
  @include transition(all);

  &--info {
    @include theme-prop(background-color, colors, info, 50);
    @include theme-prop(border-color, colors, info, 500);
    @include theme-prop(color, colors, info, 700);
  }

  &--success {
    @include theme-prop(background-color, colors, success, 50);
    @include theme-prop(border-color, colors, success, 500);
    @include theme-prop(color, colors, success, 700);
  }

  &--warning {
    @include theme-prop(background-color, colors, warning, 50);
    @include theme-prop(border-color, colors, warning, 500);
    @include theme-prop(color, colors, warning, 700);
  }

  &--error {
    @include theme-prop(background-color, colors, error, 50);
    @include theme-prop(border-color, colors, error, 500);
    @include theme-prop(color, colors, error, 700);
  }

  &__icon {
    margin-right: $spacing-3;
  }

  &__title {
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-1;
  }

  &__message {
    font-size: $font-size-sm;
  }

  &__close {
    @include reset-button;
    margin-left: auto;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}
```

### 2. Responsywny Layout

```scss
// layouts/Dashboard.scss
.dashboard {
  @include container($container-2xl);

  &__header {
    @include flex-between;
    padding: $spacing-6 0;
    margin-bottom: $spacing-8;

    @include respond-below(md) {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-4;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: $spacing-6;

    @include respond-below(lg) {
      grid-template-columns: repeat(6, 1fr);
      gap: $spacing-4;
    }

    @include respond-below(md) {
      grid-template-columns: 1fr;
      gap: $spacing-3;
    }
  }

  &__sidebar {
    grid-column: span 3;

    @include respond-below(lg) {
      grid-column: span 6;
      order: 2;
    }
  }

  &__main {
    grid-column: span 9;

    @include respond-below(lg) {
      grid-column: span 6;
      order: 1;
    }
  }
}
```

### 3. Custom Theme Example

```scss
// themes/_custom-brand.scss
$theme-custom-brand: (
  name: 'custom-brand',
  colors: (
    primary: (
      50: #fef2f2,
      100: #fee2e2,
      200: #fecaca,
      300: #fca5a5,
      400: #f87171,
      500: #ef4444,
      // Brand red
      600: #dc2626,
      700: #b91c1c,
      800: #991b1b,
      900: #7f1d1d,
    ),
    secondary: (
      // ...
    ),
    // Użyj tych samych struktur co domyślny motyw
  ), // ... pozostałe właściwości
);

// Aplikuj w aplikacji
.app[data-theme='custom-brand'] {
  @include apply-theme($theme-custom-brand);
}
```

---

## Maintenance & Updates

### Dodawanie Nowych Komponentów

1. Utwórz plik w `components/_nowy-komponent.scss`
2. Zaimportuj w `components/_index.scss`
3. Dodaj do głównego `index.scss`
4. Utwórz dokumentację w Storybook
5. Dodaj testy wizualne

### Rozszerzanie Systemu Zmiennych

```scss
// variables/_custom.scss
$custom-variable: value;

// Dodaj do index.scss
@import 'variables/custom';
```

### Version Control

```text
v1.0.0 - Initial release
v1.1.0 - Added dark theme
v1.2.0 - New component: Modal
v2.0.0 - Breaking: Refactored theme system
```

---

## Troubleshooting

### Problemy z Importami

```scss
// ❌ Błąd
@import 'variables'; // Brak ścieżki

// ✅ Poprawnie
@import '@styles/variables/typography';
```

### Problemy z Theme Functions

```scss
// ❌ Błąd - theme-get nie działa
.component {
  color: theme-get(colors, primary); // Nieprawidłowa ścieżka
}

// ✅ Poprawnie
.component {
  color: theme-get(colors, primary, 500); // Pełna ścieżka
}
```

### Problemy z Responsive Mixins

```scss
// ❌ Błąd - nieistniejący breakpoint
@include respond-to(desktop) {
  // Nie ma 'desktop' w $breakpoints
  // ...
}

// ✅ Poprawnie
@include respond-to(lg) {
  // Użyj zdefiniowanych breakpointów
  // ...
}
```

### Konflikty Specificity

```scss
// Problem: utility class nie nadpisuje komponentu
.button {
  margin: $spacing-4;  // Specificity: 0,0,1,0
}

.mt-0 {
  margin-top: 0;  // Specificity: 0,0,1,0 - może nie działać
}

// Rozwiązanie 1: Użyj !important w utilities (opcjonalne)
.mt-0 {
  margin-top: 0 !important;
}

// Rozwiązanie 2: Zwiększ specificity przez zagnieżdżenie
.component .mt-0 {
  margin-top: 0;
}

// Rozwiązanie 3: Najlepsze - unikaj konfliktu
<button class="button-custom mt-0">  // Nie mieszaj
<button class="btn btn--primary">   // Lub
```

---

## Performance Optimization

### 1. CSS Output Optimization

```scss
// Unikaj generowania nieużywanych styli
// Używaj PurgeCSS w production

// postcss.config.js
module.exports = {
  plugins:
    [ require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')
      (
        {content: [ './src/**/*.jsx',
        './src/**/*.js',
        './index.html',
        ],
        safelist: [ / ^data-theme/,
        /^theme-/,
        /is-/,
        /has-/,
        ],
        defaultExtractor: content => content.match(/[\w-/: ] + (?<!: ) / g) || []}
      ),
    ].filter(Boolean);
}
```

### 2. Lazy Loading Themes

```javascript
// ThemeLoader.jsx
export const loadTheme = async themeName => {
  if (themeName === 'dark') {
    await import('@styles/themes/_dark.scss');
  } else if (themeName === 'custom') {
    await import('@styles/themes/_custom-brand.scss');
  }
  // Default theme już załadowany
};

// Usage
const { setTheme } = useTheme();

const switchTheme = async newTheme => {
  await loadTheme(newTheme);
  setTheme(newTheme);
};
```

### 3. Critical CSS

```javascript
// Extract critical CSS for above-the-fold content
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## Advanced Patterns

### 1. Component Composition Pattern

```scss
// Base component
%card-base {
  padding: $spacing-4;
  border-radius: $border-radius-lg;
  @include theme-prop(background-color, colors, bg, default);
}

// Composed components
.product-card {
  @extend %card-base;
  @include card-shadow(2);
  @include hover-lift;
}

.info-card {
  @extend %card-base;
  border: $border-width-default solid theme-get(colors, border, default);
}

.featured-card {
  @extend %card-base;
  @include card-shadow(4);
  border-left: 4px solid theme-get(colors, primary, 500);
}
```

### 2. Utility Class Generator

```scss
// Generate spacing utilities dynamically
$spacing-values: (
  '0': 0,
  '1': $spacing-1,
  '2': $spacing-2,
  '3': $spacing-3,
  '4': $spacing-4,
  '5': $spacing-5,
  '6': $spacing-6,
  '8': $spacing-8,
  '10': $spacing-10,
  '12': $spacing-12,
  '16': $spacing-16,
  '20': $spacing-20,
  '24': $spacing-24,
);

@each $name, $value in $spacing-values {
  // Padding
  .p-#{$name} {
    padding: $value;
  }
  .pt-#{$name} {
    padding-top: $value;
  }
  .pr-#{$name} {
    padding-right: $value;
  }
  .pb-#{$name} {
    padding-bottom: $value;
  }
  .pl-#{$name} {
    padding-left: $value;
  }
  .px-#{$name} {
    padding-left: $value;
    padding-right: $value;
  }
  .py-#{$name} {
    padding-top: $value;
    padding-bottom: $value;
  }

  // Margin
  .m-#{$name} {
    margin: $value;
  }
  .mt-#{$name} {
    margin-top: $value;
  }
  .mr-#{$name} {
    margin-right: $value;
  }
  .mb-#{$name} {
    margin-bottom: $value;
  }
  .ml-#{$name} {
    margin-left: $value;
  }
  .mx-#{$name} {
    margin-left: $value;
    margin-right: $value;
  }
  .my-#{$name} {
    margin-top: $value;
    margin-bottom: $value;
  }

  // Responsive variants
  @each $breakpoint in map-keys($breakpoints) {
    @include respond-to($breakpoint) {
      .#{$breakpoint}\:p-#{$name} {
        padding: $value;
      }
      .#{$breakpoint}\:m-#{$name} {
        margin: $value;
      }
      // ... inne warianty
    }
  }
}
```

### 3. Dark Mode with CSS Variables

```scss
// Generate CSS custom properties for runtime theming
:root {
  @each $shade in (50, 100, 200, 300, 400, 500, 600, 700, 800, 900) {
    --color-primary-#{$shade}: #{map-get(map-get($theme-default, colors), primary, $shade)};
  }

  --color-text-primary: #{theme-get(colors, text, primary)};
  --color-bg-default: #{theme-get(colors, bg, default)};
  // ... inne zmienne
}

[data-theme='dark'] {
  @each $shade in (50, 100, 200, 300, 400, 500, 600, 700, 800, 900) {
    --color-primary-#{$shade}: #{map-get(map-get($theme-dark, colors), primary, $shade)};
  }

  --color-text-primary: #{map-get(map-get($theme-dark, colors), text, primary)};
  --color-bg-default: #{map-get(map-get($theme-dark, colors), bg, default)};
  // ... inne zmienne
}

// Usage in components
.component {
  color: var(--color-text-primary);
  background-color: var(--color-bg-default);
}
```

### 4. Pseudo-Class State Manager

```scss
@mixin interactive-states($base-color) {
  $hover-color: darken($base-color, 10%);
  $active-color: darken($base-color, 15%);
  $focus-color: $base-color;

  background-color: $base-color;
  @include transition(background-color, transform, box-shadow);

  &:hover:not(:disabled) {
    background-color: $hover-color;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    background-color: $active-color;
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid $focus-color;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba($focus-color, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

// Usage
.button-primary {
  @include interactive-states(theme-get(colors, primary, 500));
}
```

### 5. Container Queries (Modern CSS)

```scss
// Container queries for more granular component responsiveness
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  padding: $spacing-4;

  // When container is at least 400px wide
  @container card (min-width: 400px) {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: $spacing-4;
  }

  // When container is at least 600px wide
  @container card (min-width: 600px) {
    grid-template-columns: 200px 1fr 200px;
    gap: $spacing-6;
  }
}

// Mixin version
@mixin container-query($name, $min-width) {
  @container #{$name} (min-width: #{$min-width}) {
    @content;
  }
}

// Usage
.card {
  @include container-query(card, 400px) {
    display: grid;
  }
}
```

---

## Migration Guide

### From Existing CSS to SCSS System

#### Step 1: Audit Current Styles

```bash
# Znajdź wszystkie hardkodowane kolory
grep -r "#[0-9a-fA-F]\{6\}" src/

# Znajdź hardkodowane rozmiary
grep -r "[0-9]\+px" src/

# Znajdź powtarzające się wzorce
grep -r "display: flex" src/ | wc -l
```

#### Step 2: Replace Hardcoded Values

```scss
// Before
.button {
  padding: 8px 16px;
  background-color: #2196f3;
  border-radius: 4px;
}

// After
.button {
  padding: $spacing-2 $spacing-4;
  @include theme-prop(background-color, colors, primary, 500);
  border-radius: $border-radius-default;
}
```

#### Step 3: Extract Common Patterns

```scss
// Before - duplicated code
.card-1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

// After - using mixin
.card-1 {
  @include flex-center;
}

.card-2 {
  @include flex-center;
}
```

#### Step 4: Implement Theming

```javascript
// Add theme context
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

#### Step 5: Test & Validate

```javascript
// Visual regression testing with Playwright
import { test, expect } from '@playwright/test';

test('button renders correctly in light theme', async ({ page }) => {
  await page.goto('/storybook/?path=/story/button--primary');
  await expect(page).toHaveScreenshot('button-light.png');
});

test('button renders correctly in dark theme', async ({ page }) => {
  await page.goto('/storybook/?path=/story/button--primary');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await expect(page).toHaveScreenshot('button-dark.png');
});
```

---

## Checklist dla Nowych Komponentów

### Design Phase

- [ ] Zdefiniuj wszystkie warianty (primary, secondary, etc.)
- [ ] Określ rozmiary (xs, sm, md, lg, xl)
- [ ] Zaplanuj stany (hover, active, disabled, loading)
- [ ] Sprawdź accessibility requirements
- [ ] Przygotuj design dla light i dark theme

### Development Phase

- [ ] Utwórz plik SCSS w `components/`
- [ ] Użyj zmiennych z systemu (nie hardcode)
- [ ] Zastosuj odpowiednie mixiny
- [ ] Dodaj responsive breakpoints
- [ ] Implementuj focus states
- [ ] Dodaj theme-aware properties

### Testing Phase

- [ ] Stwórz stories w Storybook
- [ ] Test wszystkich wariantów
- [ ] Test wszystkich rozmiarów
- [ ] Test responsive behavior
- [ ] Test light/dark theme
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Visual regression tests

### Documentation Phase

- [ ] Dokumentuj props/variants w Storybook
- [ ] Dodaj przykłady użycia
- [ ] Dokumentuj custom properties
- [ ] Dodaj accessibility notes
- [ ] Update component index

### Code Review Checklist

- [ ] Kod zgodny z BEM convention
- [ ] Nie ma hardkodowanych wartości
- [ ] Używa theme-aware properties
- [ ] Poprawna specificity (max 3 poziomy)
- [ ] Brak !important (chyba że utilities)
- [ ] Responsive design mobile-first
- [ ] Accessibility features
- [ ] Performance optimized (min selectors)

---

## Zasoby i Referencje

### Oficjalna Dokumentacja

- [SCSS Official Documentation](https://sass-lang.com/documentation)
- [BEM Methodology](https://en.bem.info/methodology/)
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [A11y Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Narzędzia

- [Stylelint](https://stylelint.io/) - CSS/SCSS linting
- [PostCSS](https://postcss.org/) - CSS transformations
- [PurgeCSS](https://purgecss.com/) - Unused CSS removal
- [Storybook](https://storybook.js.org/) - Component documentation

### Design Resources

- [Material Design Color System](https://material.io/design/color)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Coolors](https://coolors.co/) - Color palette generator
- [Type Scale](https://type-scale.com/) - Typography scale calculator

### Community

- [CSS-Tricks](https://css-tricks.com/)
- [Smashing Magazine](https://www.smashingmagazine.com/)
- [Modern CSS Solutions](https://moderncss.dev/)

---

## FAQ

### Q: Kiedy używać CSS Modules vs utility classes?

**A:**

- **CSS Modules**: Dla komponentów z unikalną logiką stylowania, złożonych układów
- **Utility Classes**: Dla prostych, jednorazowych stylów, szybkich prototypów

### Q: Jak obsługiwać vendor prefixes?

**A:** Używaj PostCSS z autoprefixer - nie dodawaj prefixów ręcznie w SCSS.

### Q: Czy mogę mieszać różne systemy nazewnictwa?

**A:** Nie zalecane. Wybierz BEM dla komponentów i trzymaj się go konsekwentnie.

### Q: Jak zarządzać z-index w dużej aplikacji?

**A:** Używaj zmiennych z `_z-index.scss` i funkcji `z()` - nigdy nie hardkoduj wartości.

### Q: Czy powinienem używać @extend czy @mixin?

**A:**

- **@mixin**: Gdy potrzebujesz parametrów lub content injection
- **@extend**: Dla prostych, bezparametrowych stylów (użyj ostrożnie - może zwiększyć rozmiar CSS)

### Q: Jak testować responsywność?

**A:** Używaj Chrome DevTools, Playwright dla automated testing, real device testing dla final validation.

### Q: Jak dodać nowy breakpoint?

**A:** Dodaj w `variables/_breakpoints.scss` i update w mapie `$breakpoints`. System automatycznie wygeneruje utilities.

### Q: Czy mogę używać CSS-in-JS zamiast SCSS?

**A:** Możesz, ale ten system został zaprojektowany dla SCSS. Dla CSS-in-JS rozważ styled-components lub emotion.

---

## Changelog

### Version 1.0.0 (Initial Release)

- ✅ Complete variable system
- ✅ Theme support (light/dark)
- ✅ Comprehensive mixin library
- ✅ Responsive utilities
- ✅ Base components (buttons, forms, cards)
- ✅ Storybook integration
- ✅ Documentation

### Planned Features (v1.1.0)

- [ ] Additional themes (high contrast, colorblind-friendly)
- [ ] Animation library expansion
- [ ] More component variants
- [ ] CSS Grid utilities enhancement
- [ ] Performance monitoring tools
- [ ] Automatic documentation generation

---

## Podsumowanie

Ten system styli SCSS zapewnia:

1. **Kompletność** - Wszystkie potrzebne narzędzia w jednym miejscu
2. **Elastyczność** - Łatwe dostosowanie do potrzeb projektu
3. **Skalowalność** - Sprawdzi się w małych i dużych projektach
4. **Maintainability** - Łatwe w utrzymaniu i rozwoju
5. **Performance** - Zoptymalizowany output CSS
6. **DX** - Doskonałe developer experience
7. **Accessibility** - Built-in wsparcie dla a11y
8. **Theming** - Pełne wsparcie dla custom themes

Zacznij od podstaw, stopniowo wprowadzaj nowe komponenty i nie bój się dostosowywać systemu do swoich potrzeb!

---

## License

MIT License - Use freely in your projects

## Credits

Created with ❤️ for modern web development

---

**Dokumentacja zaktualizowana:** 2024
**Wersja:** 1.0.0
**Maintainer:** Development Team
