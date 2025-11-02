# Preact UI Components

A modern, accessible, and reusable component library built with Preact, TypeScript, and SCSS. This project provides a set of high-quality UI components designed for building scalable web applications.

## Features

- ⚡ **Fast**: Built with Preact for optimal performance
- 🎨 **Modern**: Uses SCSS modules for styling with a design system approach
- ♿ **Accessible**: WCAG 2.1 Level AA compliant components
- 📱 **Responsive**: Mobile-first design with fluid layouts
- 🔧 **Developer Experience**: TypeScript support, Storybook documentation, and comprehensive tooling
- 🧪 **Tested**: Includes testing setup with Vitest and Testing Library

## Installation

```bash
npm install
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

### Type Checking

```bash
npm run lint
```

## Building

### Production Build

```bash
npm run build
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

## Project Structure

```text
src/
├── assets/          # Static assets
├── stories/         # Storybook stories and components
│   ├── Button.tsx   # Example component
│   ├── Header.tsx   # Example component
│   └── Page.tsx     # Example component
├── app.tsx          # Main app component
├── index.ts         # Library entry point
└── main.tsx         # App entry point
```

## Component Development

Components are developed using:

- **Preact**: For reactive UI
- **TypeScript**: For type safety
- **SCSS Modules**: For scoped styling
- **Storybook**: For component documentation and testing

### Creating a New Component

1. Create component file in `src/stories/`
2. Add corresponding `.stories.tsx` file
3. Add `.css` or `.scss` file for styles
4. Export from `src/stories/index.ts`
5. Update `src/index.ts` if it's part of the public API

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for deployment
- `npm run lint` - Run TypeScript type checking
- `npm run build:docs` - Generate TypeDoc documentation

## Technologies

- **Preact** - Fast reactive UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **SCSS** - Enhanced CSS with variables and mixins
- **Storybook** - Component development and documentation
- **TypeDoc** - API documentation generation
- **Vitest** - Fast unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Design System

This project follows a design system approach with:

- Consistent color palette
- Typography scale
- Spacing system
- Component patterns
- Accessibility guidelines

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run `npm run lint` to ensure code quality
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Repository

[GitHub Repository](https://github.com/username/preact-ui-components.git)
