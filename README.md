# Preact UI Components

A modern, accessible, and reusable component library built with Preact, TypeScript, and SCSS. This project provides a set of high-quality UI components designed for building scalable web applications.

## Features

- ⚡ **Fast**: Built with Preact for optimal performance
- 🎨 **Modern**: Uses SCSS modules for styling with a design system approach
- ♿ **Accessible**: WCAG 2.1 Level AA compliant components
- 📱 **Responsive**: Mobile-first design with fluid layouts
- 🔧 **Developer Experience**: TypeScript support, Storybook documentation, and comprehensive tooling
- 🧪 **Tested**: Includes testing setup with Vitest and Testing Library
- 📦 **Publishable**: Ready for npm distribution as a scoped package

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
import { Button, Header, Page } from '@prachwal/preact-ui-components';
import '@prachwal/preact-ui-components/styles';

// Use components in your app
function App() {
  return (
    <Page>
      <Header
        user={{ name: 'John Doe' }}
        onLogin={() => {}}
        onLogout={() => {}}
        onCreateAccount={() => {}}
      />
      <Button label='Click me' onClick={() => console.log('Clicked!')} />
    </Page>
  );
}
```

### Individual Component Import

```tsx
import { Button } from '@prachwal/preact-ui-components';
// Import styles separately
import '@prachwal/preact-ui-components/styles';
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
├── stories/             # Components and Storybook stories
│   ├── Button.tsx       # Button component
│   ├── Button.stories.tsx # Button stories
│   ├── Button.test.tsx  # Button tests
│   ├── Header.tsx       # Header component
│   ├── Page.tsx         # Page layout component
│   └── index.ts         # Component exports
├── styles/              # Global styles and design system
│   ├── index.scss       # Main stylesheet
│   └── index.scss.d.ts  # TypeScript declarations
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

This project follows a comprehensive design system with:

- **Color Palette**: OKLCH color space with light/dark mode support
- **Typography**: Fluid typography with clamp() functions
- **Spacing**: Consistent spacing scale using CSS custom properties
- **Components**: Reusable component patterns and variants
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Responsive**: Mobile-first approach with fluid layouts

### CSS Custom Properties

The design system uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: oklch(55% 0.2 240);
  --color-bg-dark: oklch(18% 0.015 240);
  --color-text-dark: oklch(92% 0.01 220);
  /* ... more variables */
}
```

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

### Development Guidelines

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
