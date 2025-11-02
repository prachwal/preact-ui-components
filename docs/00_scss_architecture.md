# Architektura Systemu SCSS - Kompletny Przewodnik

## Spis Treści

1. [Wprowadzenie](#wprowadzenie)
2. [Struktura Katalogów](#struktura-katalogów)
3. [System Zmiennych (Design Tokens)](#system-zmiennych-design-tokens)
4. [Mixiny i Funkcje](#mixiny-i-funkcje)
5. [System Kolorów](#system-kolorów)
6. [Typografia](#typografia)
7. [Spacing i Layout](#spacing-i-layout)
8. [Responsywność](#responsywność)
9. [Komponenty](#komponenty)
10. [Najlepsze Praktyki](#najlepsze-praktyki)
11. [Migracja i Rozwój](#migracja-i-rozwój)

---

## Wprowadzenie

System SCSS dla biblioteki komponentów UI w Preact jest zbudowany w oparciu o nowoczesne praktyki Sass, wykorzystując `@use` i `@forward` zamiast przestarzałego `@import`. Zapewnia to lepszą enkapsulację, unikanie konfliktów nazw i poprawę wydajności kompilacji.

### Kluczowe Założenia

- **Modularność**: Każdy plik odpowiada za jedną odpowiedzialność
- **Skalowalność**: Łatwe rozszerzanie bez łamania istniejącego kodu
- **Konsystencja**: Zunifikowane wzorce projektowe
- **Performance**: Minimalizacja duplikatów i optymalizacja wyjścia CSS
- **DX**: Doskonałe doświadczenie programisty z pełnym IntelliSense
- **Modern Sass**: Użycie `@use/@forward` zamiast `@import`
- **CSS Custom Properties**: Dla dynamicznych motywów

---

## Struktura Katalogów

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
│   ├── _modals.scss        # Style modali
│   └── _app.scss           # Style aplikacji
├── utilities/              # Narzędzia pomocnicze
│   ├── _mixins.scss        # Mixiny
│   ├── _functions.scss     # Funkcje SCSS
│   ├── _responsive.scss    # Responsywność
│   ├── _animations.scss    # Animacje
│   ├── _color-functions.scss  # Funkcje kolorów
│   └── _helpers.scss       # Klasy pomocnicze
└── variables/              # Zmienne design tokens
    ├── _typography.scss    # Rozmiary czcionek, wagi
    ├── _sizes.scss         # Rozmiary komponentów
    ├── _breakpoints.scss   # Punkty przełomowe
    ├── _z-index.scss       # Warstwy z-index
    ├── _borders.scss       # Border radius, width
    ├── _shadows.scss       # Definicje cieni
    └── _transitions.scss   # Czas i funkcje przejść
```

### Główny Plik - index.scss

```scss
// =============================================================================
// Modern SCSS System - Entry Point
// Using @use instead of deprecated @import for better modularity and namespacing
// =============================================================================

// Base: Reset and foundational styles
@use 'base/reset';
@use 'base/colors';
@use 'base/spacing';
@use 'base/typography';

// Variables: Design tokens
// Using @forward to re-export for use in other files
@forward 'variables/typography';
@forward 'variables/sizes';
@forward 'variables/breakpoints';
@forward 'variables/z-index';
@forward 'variables/borders';
@forward 'variables/shadows';
@forward 'variables/transitions';

// Utilities: Mixins, functions, and helpers
@forward 'utilities/functions';
@forward 'utilities/mixins';
@forward 'utilities/responsive';
@forward 'utilities/animations';
@use 'utilities/helpers';

// Components: UI component styles
@use 'components/buttons';
@use 'components/forms';
@use 'components/cards';
@use 'components/modals';
@use 'components/app';
```

---

## System Zmiennych (Design Tokens)

### Filozofia Design Tokens

Design tokens to centralne zmienne definiujące wszystkie aspekty wizualne systemu. Zapewniają one:
- **Konsystencję** - jednolity wygląd w całej aplikacji
- **Łatwość aktualizacji** - zmiana w jednym miejscu
- **Semantyczny naming** - zrozumiałe nazwy
- **Type safety** - wsparcie dla TypeScript

### Hierarchia Tokenów

```
Variables (Design Tokens)
    ↓
Base Styles (Colors, Typography, Spacing)
    ↓
Utilities (Mixins, Functions)
    ↓
Components (Buttons, Forms, Cards)
```

---

## System Kolorów

### Paleta Główna

System kolorów oparty jest na Material Design z paletą 50-900 dla każdego koloru.

#### Primary - Główny Kolor Marki (Niebieski)

```scss
$color-primary-50: #e3f2fd;
$color-primary-100: #bbdefb;
$color-primary-200: #90caf9;
$color-primary-300: #64b5f6;
$color-primary-400: #42a5f5;
$color-primary-500: #2196f3; // Base - główny kolor
$color-primary-600: #1e88e5;
$color-primary-700: #1976d2;
$color-primary-800: #1565c0;
$color-primary-900: #0d47a1;
```

**Użycie:**
- `500` - Podstawowy kolor dla przycisków, linków
- `600-700` - Stany hover
- `800-900` - Stany active/pressed
- `50-200` - Tła, subtle backgrounds

#### Secondary - Kolor Akcentujący (Różowy)

```scss
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
```

**Użycie:**
- Akcenty i podkreślenia
- FAB buttons
- Highlighting ważnych elementów

#### Neutral - Skala Szarości

```scss
$color-neutral-50: #fafafa;   // Jasne tła
$color-neutral-100: #f5f5f5;  // Subtle backgrounds
$color-neutral-200: #eeeeee;  // Borders light
$color-neutral-300: #e0e0e0;  // Borders default
$color-neutral-400: #bdbdbd;  // Disabled elements
$color-neutral-500: #9e9e9e;  // Ikony, placeholders
$color-neutral-600: #757575;  // Tekst secondary
$color-neutral-700: #616161;  // Tekst primary dark mode
$color-neutral-800: #424242;  // Tła dark mode
$color-neutral-900: #212121;  // Tekst primary, tła deep
```

### Kolory Semantyczne

#### Success (Sukces/Pozytywne)

```scss
$color-success-50: #e8f5e9;
$color-success-500: #4caf50; // Base
$color-success-700: #388e3c;
```

**Użycie:** Komunikaty o sukcesie, zatwierdzenia, pozytywne stany

#### Warning (Ostrzeżenie)

```scss
$color-warning-50: #fff3e0;
$color-warning-500: #ff9800; // Base
$color-warning-700: #f57c00;
```

**Użycie:** Ostrzeżenia, alerty, uwaga użytkownika

#### Error (Błąd/Negatywne)

```scss
$color-error-50: #ffebee;
$color-error-500: #f44336; // Base
$color-error-700: #d32f2f;
```

**Użycie:** Błędy walidacji, komunikaty o błędach, stany destructive

#### Info (Informacja)

```scss
$color-info-50: #e1f5fe;
$color-info-500: #03a9f4; // Base
$color-info-700: #0288d1;
```

**Użycie:** Informacje, wskazówki, pomocne wiadomości

### Kolory Semantyczne - Użycie

```scss
// Text colors
$color-text-primary: $color-neutral-900;      // Główny tekst
$color-text-secondary: $color-neutral-700;    // Tekst pomocniczy
$color-text-disabled: $color-neutral-400;     // Tekst wyłączony
$color-text-inverse: #ffffff;                 // Tekst na ciemnym tle

// Background colors
$color-bg-default: #ffffff;                   // Główne tło
$color-bg-subtle: $color-neutral-50;          // Subtelne tło
$color-bg-hover: $color-neutral-100;          // Stan hover
$color-bg-active: $color-neutral-200;         // Stan active
$color-bg-disabled: $color-neutral-100;       // Wyłączony

// Border colors
$color-border-default: $color-neutral-300;    // Standardowa ramka
$color-border-hover: $color-neutral-400;      // Ramka hover
$color-border-focus: $color-primary-500;      // Ramka focus
$color-border-error: $color-error-500;        // Ramka błędu
```

### Przykłady Użycia Kolorów

```scss
// Przykład 1: Button Primary
.btn-primary {
  background-color: $color-primary-500;
  color: $color-text-inverse;
  border: 1px solid $color-primary-500;

  &:hover {
    background-color: $color-primary-600;
  }

  &:active {
    background-color: $color-primary-700;
  }
}

// Przykład 2: Input z walidacją
.input {
  border-color: $color-border-default;
  background-color: $color-bg-default;

  &:focus {
    border-color: $color-border-focus;
  }

  &.error {
    border-color: $color-border-error;
  }

  &:disabled {
    background-color: $color-bg-disabled;
    color: $color-text-disabled;
  }
}

// Przykład 3: Alert Success
.alert-success {
  background-color: $color-success-50;
  border-left: 4px solid $color-success-500;
  color: $color-success-700;
}
```

---

## Typografia

### Font Families

```scss
// Primary - Sans-serif system stack
$font-family-primary:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 
  'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

// Secondary - Serif dla nagłówków/akcentów
$font-family-secondary: 'Georgia', 'Times New Roman', serif;

// Mono - Dla kodu
$font-family-mono: 'Fira Code', 'Courier New', monospace;
```

### Font Sizes - Skala Modularna (1.250 - Major Third)

```scss
$font-size-xs: 0.64rem;   // 10.24px - małe etykiety
$font-size-sm: 0.8rem;    // 12.8px  - pomocniczy tekst
$font-size-base: 1rem;    // 16px    - podstawowy tekst
$font-size-md: 1.25rem;   // 20px    - większy tekst
$font-size-lg: 1.563rem;  // 25px    - małe nagłówki
$font-size-xl: 1.953rem;  // 31.25px - średnie nagłówki
$font-size-2xl: 2.441rem; // 39px    - duże nagłówki
$font-size-3xl: 3.052rem; // 48.83px - bardzo duże
$font-size-4xl: 3.815rem; // 61px    - hero text
$font-size-5xl: 4.768rem; // 76.29px - display text
```

**Uzasadnienie skali 1.250:**
- Harmonijne proporcje wizualne
- Czytelna hierarchia
- Dobrze skaluje się w responsywnym designie

### Font Weights

```scss
$font-weight-thin: 100;       // Bardzo cienki
$font-weight-light: 300;      // Lekki
$font-weight-normal: 400;     // Normalny (default)
$font-weight-medium: 500;     // Średni
$font-weight-semibold: 600;   // Pół-bold
$font-weight-bold: 700;       // Bold
$font-weight-extrabold: 800;  // Extra bold
$font-weight-black: 900;      // Najciemniejszy
```

### Line Heights

```scss
$line-height-tight: 1.25;     // Nagłówki, kompaktowy tekst
$line-height-snug: 1.375;     // Lekko luźniejszy
$line-height-normal: 1.5;     // Standardowy (default)
$line-height-relaxed: 1.625;  // Wygodny do czytania
$line-height-loose: 2;        // Bardzo przestronny
```

### Przykłady Typografii

```scss
// Nagłówek H1
h1 {
  font-family: $font-family-primary;
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  color: $color-text-primary;
}

// Body text
p {
  font-family: $font-family-primary;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  line-height: $line-height-relaxed;
  color: $color-text-primary;
}

// Code block
code {
  font-family: $font-family-mono;
  font-size: $font-size-sm;
  background-color: $color-neutral-100;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
```

---

## Spacing i Layout

### Spacing - Skala 8px Base

System spacing oparty na jednostce bazowej 8px (0.5rem), co zapewnia spójność i łatwość w tworzeniu layoutów.

```scss
$spacing-0: 0;              // 0px    - brak odstępu
$spacing-px: 1px;           // 1px    - cienkie linie
$spacing-0-5: 0.125rem;     // 2px    - bardzo małe
$spacing-1: 0.25rem;        // 4px    - małe
$spacing-1-5: 0.375rem;     // 6px
$spacing-2: 0.5rem;         // 8px    - base unit
$spacing-2-5: 0.625rem;     // 10px
$spacing-3: 0.75rem;        // 12px
$spacing-3-5: 0.875rem;     // 14px
$spacing-4: 1rem;           // 16px   - standard
$spacing-5: 1.25rem;        // 20px
$spacing-6: 1.5rem;         // 24px
$spacing-7: 1.75rem;        // 28px
$spacing-8: 2rem;           // 32px
$spacing-9: 2.25rem;        // 36px
$spacing-10: 2.5rem;        // 40px
$spacing-12: 3rem;          // 48px
$spacing-14: 3.5rem;        // 56px
$spacing-16: 4rem;          // 64px
$spacing-20: 5rem;          // 80px
$spacing-24: 6rem;          // 96px
$spacing-28: 7rem;          // 112px
$spacing-32: 8rem;          // 128px
$spacing-36: 9rem;          // 144px
$spacing-40: 10rem;         // 160px
```

### Rozmiary Komponentów

```scss
// Component heights
$size-xs: 1.5rem;   // 24px - bardzo małe komponenty
$size-sm: 2rem;     // 32px - małe przyciski, inputy
$size-md: 2.5rem;   // 40px - standardowe (default)
$size-lg: 3rem;     // 48px - duże komponenty
$size-xl: 3.5rem;   // 56px - bardzo duże
$size-2xl: 4rem;    // 64px - ekstra duże

// Container widths
$container-sm: 640px;   // Mobile landscape
$container-md: 768px;   // Tablet
$container-lg: 1024px;  // Desktop
$container-xl: 1280px;  // Large desktop
$container-2xl: 1536px; // Extra large
```

---

## Responsywność

### Breakpoints

Mobile-first approach - zaczynamy od najmniejszych ekranów i rozbudowujemy w górę.

```scss
// Breakpoint values
$breakpoint-sm: 640px;    // Small devices (landscape phones)
$breakpoint-md: 768px;    // Medium devices (tablets)
$breakpoint-lg: 1024px;   // Large devices (laptops)
$breakpoint-xl: 1280px;   // Extra large (desktops)
$breakpoint-2xl: 1536px;  // 2X large (large desktops)

// Breakpoint map
$breakpoints: (
  sm: $breakpoint-sm,
  md: $breakpoint-md,
  lg: $breakpoint-lg,
  xl: $breakpoint-xl,
  '2xl': $breakpoint-2xl,
);
```

### Responsive Mixins

```scss
// Media query helper - min-width (mobile-first)
@mixin respond-to($breakpoint) {
  @if map.has-key($breakpoints, $breakpoint) {
    @media (min-width: map.get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn 'Breakpoint "#{$breakpoint}" not found in $breakpoints map.';
  }
}

// Max-width helper (desktop-first)
@mixin respond-below($breakpoint) {
  @if map.has-key($breakpoints, $breakpoint) {
    @media (max-width: map.get($breakpoints, $breakpoint) - 0.02) {
      @content;
    }
  } @else {
    @warn 'Breakpoint "#{$breakpoint}" not found in $breakpoints map.';
  }
}
```

### Przykłady Responsywności

```scss
// Przykład 1: Mobile-first layout
.container {
  padding: $spacing-4; // Mobile

  @include respond-to(md) {
    padding: $spacing-6; // Tablet
  }

  @include respond-to(lg) {
    padding: $spacing-8; // Desktop
  }
}

// Przykład 2: Grid responsywny
.grid {
  display: grid;
  grid-template-columns: 1fr; // Mobile: 1 kolumna
  gap: $spacing-4;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr); // Tablet: 2 kolumny
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(3, 1fr); // Desktop: 3 kolumny
  }
}

// Przykład 3: Hide on mobile
.desktop-only {
  display: none;

  @include respond-to(md) {
    display: block;
  }
}
```

---

## Mixiny i Funkcje

### Layout Mixins

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

// Container
@mixin container($max-width: $container-xl, $padding: $spacing-4) {
  max-width: $max-width;
  margin: 0 auto;
  padding-left: $padding;
  padding-right: $padding;
}
```

### Component Mixins

```scss
// Button variant
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
```

### Utility Functions

```scss
// Convert px to rem
@function rem($pixels, $context: 16) {
  @if unitless($pixels) {
    @return $pixels / $context * 1rem;
  }
  @return $pixels;
}

// Strip unit
@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
}

// Get z-index from map
@function z($layer) {
  @if map.has-key($z-layers, $layer) {
    @return map.get($z-layers, $layer);
  }
  @return 0;
}
```

---

## Komponenty

### Organizacja Komponentów

Każdy komponent powinien:
1. Używać BEM naming convention
2. Importować tylko potrzebne zmienne
3. Być responsywny
4. Wspierać stany (hover, active, disabled, focus)

### Przykład Komponenty - Button

```scss
// components/_buttons.scss
@use '../base/colors' as *;
@use '../variables/spacing' as *;
@use '../variables/transitions' as *;

.btn {
  // Base styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-2 $spacing-4;
  border: 2px solid transparent;
  border-radius: 4px;
  font-weight: $font-weight-medium;
  font-size: $font-size-base;
  line-height: $line-height-normal;
  cursor: pointer;
  transition: all $transition-duration-base $transition-timing-ease;

  // Variants
  &--primary {
    background-color: $color-primary-500;
    color: $color-text-inverse;

    &:hover:not(:disabled) {
      background-color: $color-primary-600;
    }
  }

  &--secondary {
    background-color: transparent;
    border-color: $color-border-default;
    color: $color-text-primary;

    &:hover:not(:disabled) {
      background-color: $color-bg-hover;
    }
  }

  // Sizes
  &--sm {
    padding: $spacing-1 $spacing-3;
    font-size: $font-size-sm;
  }

  &--lg {
    padding: $spacing-3 $spacing-6;
    font-size: $font-size-lg;
  }

  // States
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid $color-border-focus;
    outline-offset: 2px;
  }
}
```

---

## Najlepsze Praktyki

### 1. Używaj @use zamiast @import

```scss
// ✅ Dobrze
@use 'base/colors' as *;
@use 'utilities/mixins' as mixins;

// ❌ Źle
@import 'base/colors';
```

### 2. Namespace dla jasności

```scss
// ✅ Dobrze - explicit namespace
@use 'utilities/functions' as fn;
$size: fn.rem(16);

// ✅ Dobrze - wildcard dla często używanych
@use 'base/colors' as *;
$color: $color-primary-500;

// ⚠️ Ostrożnie - może prowadzić do konfliktów
@use 'everything' as *;
```

### 3. Dokumentuj mixiny

```scss
/// Button variant mixin
/// @param {Color} $color - Text color
/// @param {Color} $background - Background color
/// @param {Color} $border - Border color (default: $background)
@mixin button-variant($color, $background, $border: $background) {
  // Implementation
}
```

### 4. Używaj semantic naming

```scss
// ✅ Dobrze - semantyczne
$color-text-primary
$spacing-section
$size-input-default

// ❌ Źle - generyczne
$color1
$space5
$size-m
```

### 5. Mobile-first approach

```scss
// ✅ Dobrze
.element {
  width: 100%; // Mobile

  @include respond-to(md) {
    width: 50%; // Tablet+
  }
}

// ❌ Źle - desktop-first
.element {
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
}
```

---

## Migracja i Rozwój

### Dodawanie Nowych Kolorów

```scss
// 1. Dodaj kolor w base/_colors.scss
$color-brand-purple-500: #9333ea;

// 2. Dodaj semantic usage
$color-brand-primary: $color-brand-purple-500;

// 3. Użyj w komponencie
@use '../base/colors' as *;

.branded-button {
  background-color: $color-brand-primary;
}
```

### Rozszerzanie Mixinów

```scss
// utilities/_mixins.scss
@mixin my-custom-mixin($param) {
  // Implementation
}

// Użycie
@use '../utilities/mixins' as *;

.my-component {
  @include my-custom-mixin(value);
}
```

### Performance Tips

1. **Unikaj głębokiego zagnieżdżenia** (max 3-4 poziomy)
2. **Używaj @forward dla re-exportu** zamiast wielokrotnego @use
3. **Minimalizuj duplikację** poprzez mixiny i funkcje
4. **Lazy loading** - importuj tylko to czego używasz

---

## Konfiguracja Vite

```typescript
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',  // Nowoczesny kompilator Sass
        loadPaths: [resolve(__dirname, 'src/styles')],
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});
```

---

## Narzędzia i Zasoby

### Przydatne Narzędzia

- **Sass Playground**: https://www.sassmeister.com/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Modular Scale Calculator**: https://www.modularscale.com/
- **CSS Grid Generator**: https://cssgrid-generator.netlify.app/

### Dokumentacja

- **Sass Documentation**: https://sass-lang.com/documentation
- **Modern Sass**: https://sass-lang.com/blog/the-module-system-is-launched
- **BEM Methodology**: http://getbem.com/

---

## Podsumowanie

System SCSS w tym projekcie zapewnia:

✅ **Modularność** - czytelna struktura plików
✅ **Skalowalność** - łatwe rozszerzanie
✅ **Performance** - optymalna kompilacja
✅ **DX** - przyjemne w użyciu
✅ **Konsystencja** - jednolite wzorce
✅ **Modern** - najnowsze praktyki Sass

Wszystkie komponenty budowane są w oparciu o ten system, zapewniając spójny i profesjonalny design w całej aplikacji.
