# Preact UI Components - AI Coding Guidelines

## Architecture Overview

**Preact UI component library** built with Vite and Storybook. Components in `/src/stories/` with stories and MDX docs.

**Key decisions:**

- Preact with React compatibility (`"react": ["./node_modules/preact/compat/"]`)
- TypeScript with project references
- MDX docs with Storybook canvases
- All components use .tsx with React.FC typing
- Modern SCSS architecture with @use/@forward (not @import)

## Modern SCSS System

### Architecture

The project uses a modern, modular SCSS system based on the Sass module system (@use/@forward):

**Structure:**

```
src/styles/
├── base/              # Foundation (reset, colors, spacing, typography)
├── variables/         # Design tokens (typography, sizes, breakpoints, z-index, borders, shadows, transitions)
├── utilities/         # Mixins, functions, responsive helpers, animations, utility classes
├── components/        # Component-specific styles (buttons, forms, cards, modals)
└── index.scss         # Main entry point using @use/@forward
```

### Key Principles

1. **Use @use/@forward instead of @import** - Modern Sass modules for better namespacing
2. **BEM Methodology** - Block\_\_Element--Modifier naming for component styles
3. **Design Tokens** - Centralized variables for consistency
4. **Mobile-First** - Responsive design starts with smallest screens
5. **Modern Compiler API** - Using 'modern-compiler' in Vite config

### Important SCSS Patterns

**✅ DO:**

```scss
// Use @use with namespace
@use '../base/colors' as *;
@use '../variables/spacing' as *;

// Or with explicit namespace
@use '../utilities/functions' as fn;
$size: fn.rem(16);

// Forward for re-exports
@forward 'variables/typography';

// Use modern SCSS module functions
@use 'sass:map';
@use 'sass:list';

// Access map values with modern syntax
$value: map.get($map, $key);
$list: list.append($list, $item, comma);
```

**❌ DON'T:**

```scss
// Don't use deprecated @import
@import 'variables/colors'; // DEPRECATED

// Don't use deprecated global functions
$value: map-get($map, $key); // DEPRECATED - use map.get()
$list: append($list, $item); // DEPRECATED - use list.append()

// Don't use @use inside functions/mixins
@function my-fn() {
  @use 'vars'; // ERROR - must be at top level
}

// Don't use number-starting class names
.2xl\:flex {
} // ERROR in SCSS
```

### Vite Configuration for SCSS

```typescript
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',  // Use modern Sass API
      loadPaths: [resolve(__dirname, 'src/styles')],
      silenceDeprecations: ['legacy-js-api'],
    },
  },
}
```

### Legacy Theme System

The project includes a legacy theme system for backwards compatibility with existing CSS custom properties:

**Features:**

- OKLCH color space for modern color representation
- Automatic dark/light mode switching via `prefers-color-scheme`
- CSS custom properties generation from SCSS maps
- Backwards compatible with existing component classes

**Structure:**

```
src/styles/themes/
└── _legacy-app.scss    # Legacy app theme with OKLCH colors
```

**Usage:**

```scss
// CSS custom properties are automatically generated
:root {
  --color-primary: oklch(55% 0.2 240);
  --color-bg-dark: oklch(18% 0.015 240);
  // ... etc
}

// Light mode overrides
@media (prefers-color-scheme: light) {
  :root {
    --color-primary: oklch(48% 0.2 240);
    // ... adjusted colors
  }
}
```

### Color System

**Modern OKLCH Colors:**

- Primary: `oklch(55% 0.2 240)` (blue-purple)
- Semantic colors for success, warning, error, info
- Automatic contrast calculation
- Light/dark mode variants

**Legacy HSL Colors:**

- Traditional HSL color palette
- Maintained for component compatibility
- Graduated scales (50-900) for each color

## Component Development

```typescript
export interface ComponentProps {
  /* props */
}
export const Component: React.FC<ComponentProps> = (
  {
    /* props */
  }
) => {
  /* JSX */
};
```

**Workflow:**

1. Create `Component.tsx` in `/src/components/ComponentName/`
2. Create component tests `Component.test.tsx` in same folder
3. Add styles using new SCSS system (see above)
4. Create `Component.stories.tsx` (CSF 3.0)
5. Document in `Component.mdx` (`<Canvas>`, `<ArgTypes>`)
6. Export from `/src/components/index.ts`

## Key Commands

- `npm run dev` - Vite dev server
- `npm run storybook` - Storybook dev (port 6006)
- `npm run build` - TypeScript + Vite build
- `npm run build-storybook` - Storybook to `dist/storybook/`
- `npm run build:docs` - TypeDoc documentation
- `npm run build:lib` - Library build to `lib/`
- `npm run build:css` - SCSS compilation
- `npm run build:publish` - Combined lib + CSS build
- `npm run lint` - ESLint checks
- `npm run lint:fix` - Auto-fix linting issues
- `npm run test` - Vitest tests
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run with coverage report

## Testing Setup

- **Framework**: Vitest with jsdom
- **Library**: @testing-library/preact
- **Coverage**: V8 provider to `dist/coverage/`
- **Setup**: `src/test/setup.ts` with cleanup
- **Pattern**: Co-locate tests with components (`Component.test.tsx`)

## Component Patterns

- Functional components with `memo()` for performance
- Props extend `Omit<ComponentProps<'button'>, 'type'>` for HTML passthrough
- CSS classes: BEM methodology `component__element--modifier`
- TypeScript interfaces with JSDoc comments
- Export both component and props interface

## Build System

- **Dual config**: `tsconfig.app.json` (app) vs `tsconfig.lib.json` (library)
- **Multi-stage build**: TypeScript → Vite → SCSS compilation
- **Library exports**: `lib/index.js` + `lib/index.d.ts` + `lib/styles.css`
- **Environment variables**: `VITE_*` for conditional features
- **Path Aliases**: `@styles`, `@components` configured in vite.config.ts

## CI/CD

- **GitLab CI**: `.gitlab-ci.yml` (Node.js 22, GitLab Pages deploy)
- **GitHub Actions**: `.github/workflows/ci.yml` (Node.js 22, GitHub Pages deploy)
- **Outputs**: App to `dist/`, Storybook to `dist/storybook/`

## Code Conventions

- **Props**: React.FC typing, JSDoc comments, `[key: string]: any` for extras
- **CSS**: BEM naming `block__element--modifier`
- **SCSS**: @use/@forward, modern module system, no @import
- **Imports**: Relative paths, components import own CSS
- **Stories**: CSF 3.0 format with TypeScript interfaces
- **Tests**: Co-located with components, comprehensive coverage

## ESLint Configuration

Enhanced with:

- React/Preact hooks rules
- TypeScript best practices
- Prettier integration
- Test file exceptions
- Prefer template literals over concatenation

## Key Files

- `vite.config.ts` - Vite + Vitest config with SCSS modern-compiler API
- `.storybook/main.ts` - Storybook config
- `tsconfig.app.json` - App TypeScript config
- `tsconfig.lib.json` - Library TypeScript config
- `src/test/setup.ts` - Test setup with cleanup
- `src/styles/index.scss` - SCSS system entry point
- `.gitlab-ci.yml` & `.github/workflows/ci.yml` - CI/CD configs
- `eslint.config.js` - Enhanced ESLint with React/hooks support

## Modern Practices Implemented

- ✅ @use/@forward instead of @import
- ✅ Modern Sass compiler API
- ✅ Modular SCSS architecture
- ✅ BEM naming methodology
- ✅ Modern SCSS functions (sass:map, sass:list)
- ✅ OKLCH color space for modern colors
- ✅ Legacy theme system with CSS custom properties
- ✅ Automatic dark/light mode switching
- ✅ Comprehensive test coverage
- ✅ Path aliases for cleaner imports
- ✅ ESLint with React hooks
- ✅ Automated linting fixes
