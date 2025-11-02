# Component Architecture

This document describes the architecture and development patterns for components in the Preact UI Components library.

## Overview

Components are built with:
- **Preact**: Fast, lightweight React alternative
- **TypeScript**: Type safety and better DX
- **SCSS**: Enhanced CSS with variables and mixins
- **Storybook**: Component development and documentation

## Project Structure

```
src/
├── stories/                 # Components and stories
│   ├── Button.tsx          # Component implementation
│   ├── Button.stories.tsx  # Storybook stories
│   ├── Button.test.tsx     # Unit tests
│   ├── Button.mdx          # Documentation
│   └── index.ts            # Component exports
├── styles/                 # Global styles
│   ├── index.scss          # Main stylesheet with design system
│   └── index.scss.d.ts     # TypeScript declarations
├── components/             # Future: organized components
├── app.tsx                 # Demo application
├── index.ts                # Library entry point
└── main.tsx               # Application entry point
```

## Component Development Workflow

### 1. Create Component File

Create a new component in `src/stories/ComponentName.tsx`:

```typescript
import React from 'react';

export interface ComponentNameProps {
  /** Description of prop */
  propName: string;
  /** Optional prop with default */
  optional?: boolean;
  /** Event handler */
  onClick?: () => void;
  /** Allow additional props */
  [key: string]: any;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  optional = false,
  onClick,
  ...props
}) => {
  return (
    <div className="component-name" {...props}>
      {/* Component JSX */}
    </div>
  );
};
```

### 2. Add Styles

Add component-specific styles to `src/styles/index.scss`:

```scss
.component-name {
  // Use CSS custom properties from design system
  color: var(--color-text-dark);
  background-color: var(--color-bg-light);
  padding: 1rem;
  border-radius: 8px;
  
  // BEM modifiers
  &--variant {
    background-color: var(--color-primary);
  }
  
  // Responsive behavior
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
}
```

### 3. Create Storybook Stories

Create `src/stories/ComponentName.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/preact';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    propName: {
      control: 'text',
      description: 'Description of prop',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    propName: 'value',
  },
};

export const Variant: Story = {
  args: {
    propName: 'value',
    variant: true,
  },
};
```

### 4. Add Documentation

Create `src/stories/ComponentName.mdx`:

```mdx
import { Canvas, Meta, ArgTypes } from '@storybook/blocks';
import * as ComponentNameStories from './ComponentName.stories';

<Meta of={ComponentNameStories} />

# ComponentName

Description of the component.

## Overview

Detailed explanation of what the component does.

## Basic Usage

<Canvas of={ComponentNameStories.Default} />

## Variants

### Variant Name

<Canvas of={ComponentNameStories.Variant} />

## Props

<ArgTypes of={ComponentNameStories} />

## Usage Examples

\`\`\`tsx
import { ComponentName } from '@prachwal/preact-ui-components';

function App() {
  return <ComponentName propName="value" />;
}
\`\`\`
```

### 5. Add Unit Tests

Create `src/stories/ComponentName.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName propName="test" />);
    expect(screen.getByText('test')).toBeDefined();
  });

  it('applies variant class', () => {
    const { container } = render(<ComponentName propName="test" variant />);
    expect(container.querySelector('.component-name--variant')).toBeDefined();
  });
});
```

### 6. Export Component

Add to `src/stories/index.ts`:

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

Update `src/index.ts` if it's part of the public API:

```typescript
export { ComponentName } from './stories/ComponentName';
export type { ComponentNameProps } from './stories/ComponentName';
```

## Component Guidelines

### TypeScript

1. **Always define interfaces for props**:
   ```typescript
   export interface ComponentProps {
     required: string;
     optional?: number;
   }
   ```

2. **Use React.FC for functional components**:
   ```typescript
   export const Component: React.FC<ComponentProps> = ({ required }) => {
     // implementation
   };
   ```

3. **Include JSDoc comments for all props**:
   ```typescript
   export interface ButtonProps {
     /** The button label text */
     label: string;
     /** Whether this is a primary button */
     primary?: boolean;
   }
   ```

### Styling

1. **Use BEM naming convention**:
   ```scss
   .component          // Block
   .component__element // Element
   .component--modifier // Modifier
   ```

2. **Always use CSS custom properties for colors**:
   ```scss
   color: var(--color-text-dark);
   ```

3. **Follow mobile-first responsive design**:
   ```scss
   .component {
     padding: 1rem;
     
     @media (min-width: 768px) {
       padding: 1.5rem;
     }
   }
   ```

4. **Include accessibility features**:
   ```scss
   &:focus-visible {
     outline: 2px solid var(--color-primary);
     outline-offset: 2px;
   }
   ```

### Accessibility

1. **Use semantic HTML elements**
2. **Include proper ARIA attributes when needed**
3. **Ensure keyboard navigation works**
4. **Provide focus indicators**
5. **Test with screen readers**

Example:

```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
>
  {label}
</button>
```

### Props Pattern

1. **Accept additional props with spread**:
   ```typescript
   export interface ComponentProps {
     specific: string;
     [key: string]: any;
   }
   
   export const Component: React.FC<ComponentProps> = ({
     specific,
     ...props
   }) => {
     return <div {...props}>{specific}</div>;
   };
   ```

2. **Provide sensible defaults**:
   ```typescript
   export const Component: React.FC<ComponentProps> = ({
     size = 'medium',
     variant = 'default',
   }) => {
     // implementation
   };
   ```

## Testing Guidelines

1. **Test component rendering**
2. **Test user interactions**
3. **Test different prop combinations**
4. **Test accessibility features**

Example test structure:

```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders with required props', () => {});
    it('renders with optional props', () => {});
  });
  
  describe('Interactions', () => {
    it('handles click events', () => {});
    it('updates state correctly', () => {});
  });
  
  describe('Accessibility', () => {
    it('is keyboard accessible', () => {});
    it('has proper ARIA attributes', () => {});
  });
});
```

## Storybook Best Practices

1. **Create multiple stories for different use cases**
2. **Use argTypes for interactive controls**
3. **Add descriptions to props**
4. **Include code examples in MDX docs**
5. **Test in both light and dark themes**

## Common Patterns

### Conditional Classes

```typescript
const className = [
  'component',
  variant && `component--${variant}`,
  size && `component--${size}`,
  disabled && 'component--disabled',
].filter(Boolean).join(' ');
```

### Event Handlers

```typescript
const handleClick = (event: MouseEvent) => {
  if (disabled) return;
  onClick?.(event);
};
```

### Forwarding Refs

```typescript
import { forwardRef } from 'preact/compat';

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ children, ...props }, ref) => {
    return <div ref={ref} {...props}>{children}</div>;
  }
);
```

## Performance Considerations

1. **Use memo for expensive renders**:
   ```typescript
   import { memo } from 'preact/compat';
   
   export const Component = memo(({ data }) => {
     // expensive render
   });
   ```

2. **Avoid inline function creation in render**:
   ```typescript
   // ❌ Bad
   <button onClick={() => handleClick(id)}>Click</button>
   
   // ✅ Good
   const onClick = useCallback(() => handleClick(id), [id]);
   <button onClick={onClick}>Click</button>
   ```

3. **Use CSS for animations instead of JavaScript**

## Build & Publishing

### Development Build

```bash
npm run dev          # Start Vite dev server
npm run storybook    # Start Storybook
```

### Production Build

```bash
npm run build        # Build library
npm run build:lib    # Build components only
npm run build:css    # Build CSS from SCSS
```

### Publishing

```bash
npm run build:publish  # Build for npm
npm test:run          # Run tests
npm publish           # Publish to npm
```

## Checklist for New Components

- [ ] Component file created with TypeScript interface
- [ ] Styles added to main SCSS file
- [ ] Storybook stories created
- [ ] MDX documentation written
- [ ] Unit tests written
- [ ] Component exported from index files
- [ ] Tested in both light and dark themes
- [ ] Accessibility verified (keyboard, screen reader)
- [ ] Responsive behavior tested
- [ ] Props documented with JSDoc comments

## References

- [Preact Documentation](https://preactjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Storybook Documentation](https://storybook.js.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
