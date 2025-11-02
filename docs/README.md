# Documentation

Welcome to the Preact UI Components documentation. This directory contains comprehensive guides for using and extending the component library.

## 📚 Available Documentation

### [Design System](./design-system.md)
Complete guide to the design system including:
- Color palette (OKLCH color space)
- Typography system (fluid, responsive)
- Spacing scale
- Border radius values
- Transitions and animations
- Accessibility guidelines
- Theme support (light/dark)

### [Component Architecture](./component-architecture.md)
Everything you need to know about building components:
- Project structure
- Component development workflow
- TypeScript patterns
- Styling guidelines
- Testing strategies
- Storybook best practices
- Performance considerations
- Build and publishing process

### [SCSS Usage Guide](./scss-usage.md)
Detailed guide for working with SCSS:
- CSS custom properties
- BEM naming convention
- Responsive design patterns
- Theme implementation
- Common component patterns
- OKLCH color space usage
- Build process
- Best practices and common mistakes

## 🚀 Quick Start

### For Users

If you're using the library in your project:

1. Install the package:
   ```bash
   npm install @prachwal/preact-ui-components
   ```

2. Import components and styles:
   ```tsx
   import { Button, Header } from '@prachwal/preact-ui-components';
   import '@prachwal/preact-ui-components/styles';
   ```

3. Use in your app:
   ```tsx
   <Button primary label="Click me" onClick={handleClick} />
   ```

### For Contributors

If you're contributing to the library:

1. Clone the repository:
   ```bash
   git clone https://github.com/prachwal/preact-ui-components.git
   cd preact-ui-components
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development:
   ```bash
   npm run storybook  # For component development
   npm run dev        # For app development
   ```

4. Read the [Component Architecture](./component-architecture.md) guide

## 📖 Documentation Overview

### Design System
The design system provides a consistent foundation for all components:
- **Colors**: OKLCH-based palette with automatic light/dark theme support
- **Typography**: System fonts with fluid responsive sizing
- **Spacing**: Consistent scale from 4px to 48px
- **Components**: Reusable patterns following BEM methodology

### Component Development
Components are built with modern tools and best practices:
- **Preact**: Fast, lightweight React alternative (3KB)
- **TypeScript**: Full type safety and excellent DX
- **SCSS**: Enhanced CSS with variables and nesting
- **Storybook**: Interactive documentation and development environment
- **Vitest**: Fast unit testing with coverage reports

### SCSS System
The SCSS system is built on CSS custom properties:
- **Runtime theme switching** via CSS variables
- **OKLCH color space** for perceptual uniformity
- **Mobile-first** responsive design
- **BEM naming** for maintainable styles
- **Accessibility-first** with focus states and ARIA support

## 🎨 Design Principles

### 1. Accessibility First
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly
- Proper focus indicators
- Sufficient color contrast

### 2. Performance
- Preact for minimal bundle size
- CSS-only animations
- Optimized builds
- Tree-shakeable exports

### 3. Developer Experience
- TypeScript for type safety
- Comprehensive documentation
- Interactive Storybook demos
- Well-tested components
- Clear error messages

### 4. Maintainability
- BEM naming convention
- CSS custom properties
- Modular architecture
- Consistent patterns

## 🛠️ Development Workflow

### Creating a New Component

1. **Plan the component**
   - Define props interface
   - Sketch component variants
   - Consider accessibility

2. **Implement the component**
   - Create component file with TypeScript
   - Add styles to SCSS file
   - Follow BEM naming convention

3. **Document the component**
   - Create Storybook stories
   - Write MDX documentation
   - Add usage examples

4. **Test the component**
   - Write unit tests
   - Test in both themes
   - Verify accessibility
   - Check responsive behavior

5. **Review and publish**
   - Run linting and formatting
   - Build the library
   - Update changelog
   - Publish to npm

See [Component Architecture](./component-architecture.md) for detailed steps.

## 🎯 Best Practices

### TypeScript
- Always define interfaces for props
- Use React.FC for components
- Include JSDoc comments
- Export types with components

### Styling
- Use CSS custom properties for colors
- Follow BEM naming convention
- Mobile-first responsive design
- Include focus states for accessibility

### Testing
- Test component rendering
- Test user interactions
- Test accessibility features
- Maintain high coverage (>80%)

### Documentation
- Include usage examples
- Document all props
- Show different variants
- Provide code snippets

## 📊 Component Checklist

When creating or updating a component, ensure:

- [ ] TypeScript interface defined
- [ ] Styles use CSS custom properties
- [ ] BEM naming convention followed
- [ ] Storybook stories created
- [ ] MDX documentation written
- [ ] Unit tests added
- [ ] Tested in light/dark themes
- [ ] Responsive behavior verified
- [ ] Accessibility checked (keyboard, screen reader)
- [ ] Focus states implemented
- [ ] Component exported
- [ ] Props documented with JSDoc

## 🔄 Theme System

The library supports automatic light/dark theme switching:

```scss
// Dark mode (default)
:root {
  --color-bg-dark: oklch(18% 0.015 240);
  --color-text-dark: oklch(92% 0.01 220);
}

// Light mode
@media (prefers-color-scheme: light) {
  :root {
    --color-bg-dark: oklch(97% 0.005 240);
    --color-text-dark: oklch(20% 0.02 230);
  }
}
```

All components automatically adapt to the user's system preference.

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

Note: OKLCH color space requires modern browsers. Fallbacks are provided where needed.

## 📚 Additional Resources

### Official Documentation
- [Preact Documentation](https://preactjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Storybook Documentation](https://storybook.js.org/)
- [Sass Documentation](https://sass-lang.com/documentation)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)

### Design Resources
- [OKLCH Color Picker](https://oklch.com/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [BEM Methodology](https://getbem.com/)

## 🤝 Contributing

We welcome contributions! Please:

1. Read this documentation thoroughly
2. Follow the coding standards
3. Write tests for new features
4. Update documentation
5. Submit a pull request

See [Component Architecture](./component-architecture.md) for detailed contribution guidelines.

## 📝 License

This project is licensed under the MIT License.

## 📧 Support

For questions or issues:
- Open an issue on [GitHub](https://github.com/prachwal/preact-ui-components/issues)
- Check existing documentation
- Review Storybook examples

---

**Happy coding! 🚀**
