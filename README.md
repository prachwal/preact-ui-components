# Preact UI Components

A modern, accessible, and reusable component library built with Preact, TypeScript, and SCSS. This project provides a set of high-quality UI components designed for building scalable web applications.

## Features

- ⚡ **Fast**: Built with Preact for optimal performance
- 🎨 **Modern**: Uses SCSS modules with @use/@forward for better modularity and namespacing
- ♿ **Accessible**: WCAG 2.1 Level AA compliant components with proper ARIA support
- 📱 **Responsive**: Mobile-first design with fluid layouts and breakpoint management
- 🔧 **Developer Experience**: TypeScript support, Storybook documentation, comprehensive tooling
- 🧪 **Tested**: Includes testing setup with Vitest and Testing Library
- 📦 **Publishable**: Ready for npm distribution as a scoped package
- 🛡️ **Error Boundaries**: Built-in error handling for robust applications
- 🎯 **Type Safe**: Runtime validation and TypeScript interfaces
- 🎨 **Design System**: Comprehensive SCSS architecture with design tokens

## Installation

### For Development (from source)

```bash
git clone https://github.com/prachwal/preact-ui-components.git
cd preact-ui-components
npm install
```

### As NPM Package

```bash
npm install @prachwal/preact-ui-components
```

## Usage

### Basic Setup

```tsx
import { Button, Header, Page, ErrorBoundary } from '@prachwal/preact-ui-components';
import '@prachwal/preact-ui-components/styles';

// Wrap your app with ErrorBoundary for better error handling
function App() {
  return (
    <ErrorBoundary>
      <Page>
        <Header
          user={{ name: 'John Doe' }}
          onLogin={() => {}}
          onLogout={() => {}}
          onCreateAccount={() => {}}
        />
        <Button label='Click me' onClick={() => console.log('Clicked!')} />
      </Page>
    </ErrorBoundary>
  );
}
```

### Individual Component Import

```tsx
import { Button } from '@prachwal/preact-ui-components';
// Import styles separately
import '@prachwal/preact-ui-components/styles';
```

### Individual Component Import

```tsx
import { Button } from '@prachwal/preact-ui-components';
// Import styles separately
import '@prachwal/preact-ui-components/styles';
```

## Error Handling

The library includes built-in error boundaries for robust error handling:

```tsx
import { ErrorBoundary } from '@prachwal/preact-ui-components';

function App() {
  return (
    <ErrorBoundary>
      <YourAppContent />
    </ErrorBoundary>
  );
}
```

## Development

### Start Development Server

```bash
npm run dev
```

This will start the Vite development server with hot module replacement.

### Storybook

View and develop components interactively:

```bash
npm run storybook
```

Build Storybook for production:

```bash
npm run build-storybook
```

### Type Checking & Linting

```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix auto-fixable issues
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

## Building

### Production Build

```bash
npm run build
```

This builds the library, TypeScript definitions, and CSS.

### Build Components Only

```bash
npm run build:lib
```

### Build CSS Only

```bash
npm run build:css
```

### Preview Production Build

```bash
npm run preview
```

### Generate Documentation

```bash
npm run build:docs
```

This generates TypeDoc documentation in the `dist/docs` directory.

## Testing

```bash
npm test           # Run tests in watch mode
npm run test:run   # Run tests once
npm run test:ui    # Run tests with UI
npm run test:coverage  # Run tests with coverage report
```

## Project Structure

```text
src/
├── assets/              # Static assets (logos, icons)
├── components/          # UI Components
│   ├── Button/          # Button component
│   │   ├── index.tsx    # Component implementation
│   │   ├── Button.mdx   # Documentation
│   │   ├── Button.stories.tsx # Storybook stories
│   │   └── Button.test.tsx    # Unit tests
│   ├── ErrorBoundary/   # Error boundary component
│   ├── Footer/          # Footer component
│   ├── Header/          # Header component
│   ├── Page/            # Page layout component
│   └── index.ts         # Component exports
├── config/              # Application configuration
│   └── app.ts           # App config with build constants
├── styles/              # SCSS design system
│   ├── index.scss       # Main stylesheet entry point
│   ├── index.scss.d.ts  # TypeScript declarations
│   ├── base/            # Foundation styles
│   │   ├── _colors.scss     # Color palette
│   │   ├── _reset.scss      # CSS reset
│   │   ├── _spacing.scss    # Spacing scale
│   │   └── _typography.scss # Typography system
│   ├── variables/       # Design tokens
│   │   ├── _borders.scss    # Border styles
│   │   ├── _breakpoints.scss # Responsive breakpoints
│   │   ├── _shadows.scss    # Shadow definitions
│   │   ├── _sizes.scss      # Size variables
│   │   ├── _transitions.scss # Animation transitions
│   │   └── _typography.scss # Typography variables
│   ├── utilities/       # Utility functions and mixins
│   │   ├── _animations.scss     # Animation keyframes
│   │   ├── _color-functions.scss # Color manipulation
│   │   ├── _functions.scss      # SCSS functions
│   │   ├── _helpers.scss        # Utility classes
│   │   ├── _mixins.scss         # SCSS mixins
│   │   └── _responsive.scss     # Responsive utilities
│   └── components/      # Component-specific styles
│       ├── _app.scss        # App-specific styles
│       ├── _buttons.scss    # Button styles
│       ├── _cards.scss      # Card styles
│       ├── _forms.scss      # Form styles
│       └── _modals.scss     # Modal styles
├── types/               # TypeScript type definitions
│   └── globals.d.ts     # Global type declarations
├── app.tsx              # Demo application
├── index.ts             # Library entry point
├── main.tsx             # Application entry point
└── test/
    └── setup.ts         # Test configuration
```

## Component Development

Components are developed using:

- **Preact**: For reactive UI
- **TypeScript**: For type safety
- **SCSS Modules**: For scoped styling
- **Storybook**: For component documentation and testing

### Creating a New Component

1. Create component file in `src/stories/` (e.g., `MyComponent.tsx`)
2. Add corresponding `.stories.tsx` file for Storybook
3. Add `.test.tsx` file for unit tests
4. Export from `src/stories/index.ts`
5. Update `src/index.ts` if it's part of the public API
6. Add styles in component or global stylesheet

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow accessibility best practices (ARIA, keyboard navigation)
- Use CSS custom properties for theming
- Include comprehensive prop documentation
- Write unit tests for all components

## Available Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
<Button label="Primary" primary size="medium" onClick={handleClick} />
<Button label="Secondary" size="small" onClick={handleClick} />
```

### Header

Application header with branding and user actions.

```tsx
<Header
  user={{ name: 'John Doe' }}
  onLogin={handleLogin}
  onLogout={handleLogout}
  onCreateAccount={handleCreateAccount}
/>
```

### Page

Layout component providing consistent page structure.

```tsx
<Page>
  <YourContent />
</Page>
```

## Design System

This project follows a comprehensive design system with modern SCSS architecture:

- **SCSS Architecture**: Uses @use/@forward for better modularity and namespacing
- **Color System**: HSL-based color palette with semantic color variables
- **Typography**: Fluid typography with consistent font scales
- **Spacing**: 8px-based spacing scale with rem units
- **Components**: Reusable component patterns with BEM methodology
- **Accessibility**: WCAG 2.1 Level AA compliance with proper ARIA support
- **Responsive**: Mobile-first approach with fluid layouts and breakpoint management
- **Animations**: Consistent animation system with meaningful variables

### SCSS Architecture

The SCSS system is organized into logical layers:

```scss
// Entry point with @use/@forward
@use 'base/reset';
@use 'base/colors';
@use 'base/spacing';
@use 'base/typography';

@forward 'variables/typography';
@forward 'variables/sizes';
@forward 'variables/breakpoints';
// ... etc
```

### Design Tokens

All design decisions are centralized in SCSS variables:

```scss
// Colors
$color-primary-500: hsl(220, 89%, 56%);
$color-text-primary: hsl(220, 13%, 18%);

// Spacing
$spacing-1: 0.25rem; // 4px
$spacing-2: 0.5rem; // 8px
$spacing-4: 1rem; // 16px

// Typography
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-weight-medium: 500;
```

### Development Guidelines

- Use functional components with `memo()` for performance
- Implement proper TypeScript interfaces with JSDoc comments
- Follow accessibility best practices (ARIA, keyboard navigation)
- Use BEM naming convention for CSS classes
- Include comprehensive prop validation and error handling
- Write unit tests for all components
- Document components with Storybook

## Scripts Reference

| Script                    | Description                             |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Start development server                |
| `npm run build`           | Full production build (TS + Vite + CSS) |
| `npm run build:lib`       | Build library components only           |
| `npm run build:css`       | Build CSS from SCSS                     |
| `npm run preview`         | Preview production build                |
| `npm run storybook`       | Start Storybook dev server              |
| `npm run build-storybook` | Build Storybook for deployment          |
| `npm run lint`            | Run ESLint                              |
| `npm run lint:fix`        | Auto-fix ESLint issues                  |
| `npm run format`          | Format code with Prettier               |
| `npm run build:docs`      | Generate TypeDoc documentation          |
| `npm run test`            | Run tests in watch mode                 |
| `npm run test:run`        | Run tests once                          |
| `npm run test:coverage`   | Run tests with coverage                 |

## Technologies

- **Preact** - Fast reactive UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **SCSS** - Enhanced CSS with variables and mixins
- **Storybook** - Component development and documentation
- **TypeDoc** - API documentation generation
- **Vitest** - Fast unit testing framework
- **Testing Library** - Component testing utilities
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Sass** - CSS preprocessing

## Publishing to NPM

To publish this package:

1. Update version in `package.json`
2. Update repository URLs to match your GitHub repo
3. Run `npm run build` to ensure everything builds
4. Run `npm run test:run` to ensure tests pass
5. Run `npm publish` (or `npm publish --tag beta` for pre-releases)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run `npm run lint && npm run format` to ensure code quality
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards

- Follow the existing code style and patterns
- Write comprehensive tests for new components
- Update documentation for any new features
- Ensure accessibility compliance
- Test components in both light and dark modes
- Use semantic commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Repository

[GitHub Repository](https://github.com/prachwal/preact-ui-components)

## Support

For questions or issues, please open an issue on the [GitHub repository](https://github.com/prachwal/preact-ui-components/issues).
