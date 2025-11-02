# Preact UI Components - AI Coding Guidelines

## Architecture Overview
This is a **Preact UI component library** built with Vite and documented via Storybook. Components live in `/src/stories/` alongside their stories and documentation.

**Key architectural decisions:**
- Preact with React compatibility layer (`"react": ["./node_modules/preact/compat/"]`)
- TypeScript with project references (app vs node configs)
- Component documentation uses MDX format with embedded Storybook canvases
- **All components use TypeScript (.tsx) - JSX files have been migrated to TSX**

## Component Development Patterns

### Component Structure
```typescript
// Button.tsx - Export interface + component
export interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  [key: string]: any; // Allow additional props
}

export const Button: React.FC<ButtonProps> = ({ /* props */ }) => {
  // Use React.FC typing despite Preact runtime
}
```

### Storybook Integration
- **Stories**: `.stories.tsx` files using CSF 3.0 format
- **Documentation**: `.mdx` files with `<Canvas>` components for live examples
- **CSS**: Component-specific `.css` files with `storybook-*` class prefixes

### MDX Documentation Configuration
- **Imports**: `Canvas`, `Meta`, `ArgTypes` from `@storybook/addon-docs/blocks`
- **Meta tag**: `<Meta of={ComponentStories} />` at document start
- **Story references**: `import * as ComponentStories from './Component.stories'`
- **Canvas usage**: `<Canvas of={ComponentStories.StoryName} />` for live examples
- **Props table**: `<ArgTypes of={ComponentStories.Primary} />` for automatic prop documentation
- **Asset imports**: Relative paths for images/SVGs: `import Asset from './assets/asset.svg'`

### MDX File Structure Pattern
```mdx
import { Canvas, Meta, Story } from '@storybook/addon-docs/blocks';
import { ArgTypes } from '@storybook/addon-docs/blocks';
import * as ComponentStories from './Component.stories';

<Meta of={ComponentStories} />

# Component Name

[Component description]

## Basic Usage
<Canvas of={ComponentStories.Primary} />

## Variants
<Canvas of={ComponentStories.Variant} />

## Props
<ArgTypes of={ComponentStories.Primary} />
```

### File Organization
```
src/stories/
├── Button.tsx + Button.css + Button.stories.tsx + Button.mdx
├── Header.tsx + header.css + Header.stories.tsx + Header.mdx
└── Page.tsx + page.css + Page.stories.tsx + Page.mdx
```

## Development Workflows

### Component Development
1. Create component in `/src/stories/Component.tsx`
2. Add CSS in `/src/stories/component.css` (lowercase filename)
3. Create stories in `Component.stories.tsx`
4. Document in `Component.mdx` with `<Canvas of={Stories.StoryName}>`

### Build Commands
- `npm run dev` - Vite dev server for main app
- `npm run storybook` - Storybook dev server (port 6006)
- `npm run build` - TypeScript compilation + Vite build
- `npm run build-storybook` - Static Storybook build to `dist/storybook/`
- `npm run lint` - TypeScript type checking

### CI/CD Pipeline
- **GitLab CI**: `.gitlab-ci.yml` with stages for install, build, and deploy (Node.js 22)
- **GitHub Actions**: `.github/workflows/ci.yml` with jobs for install, build, test, and deploy (Node.js 22)
- **Build outputs**: App builds to `dist/`, Storybook builds to `dist/storybook/`
- **GitLab Pages**: Storybook automatically deployed to GitLab Pages on main branch
- **GitHub Pages**: Application deployed via GitHub Actions on main branch

### TypeScript Configuration
- Uses project references: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`
- JSX transform: `"jsx": "react-jsx", "jsxImportSource": "preact"`
- Strict mode enabled with unused variable detection

## Code Conventions

### Component Props
- Use `React.FC<ComponentProps>` typing (despite Preact runtime)
- Include JSDoc comments for complex prop interfaces
- Allow additional props via `[key: string]: any`
- All components use TypeScript (.tsx) with proper type definitions

### CSS Classes
- Follow `storybook-componentname--variant` pattern
- Example: `storybook-button--primary`, `storybook-button--large`

### Import Patterns
- Components import their own CSS: `import './component.css'`
- Stories import components relatively: `import { Button } from './Button'`

## Storybook Configuration
- **Framework**: `@storybook/preact-vite`
- **Addons**: Essentials, Docs, A11y, Vitest integration
- **Stories pattern**: `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`

## Key Files
- `vite.config.ts` - Basic Preact preset configuration
- `.storybook/main.ts` - Storybook configuration with addon list
- `tsconfig.app.json` - App compilation with React compatibility paths
- `src/app.tsx` - Demo app (not part of component library)
- `.gitlab-ci.yml` - GitLab CI/CD pipeline configuration
- `.github/workflows/ci.yml` - GitHub Actions CI/CD pipeline configuration</content>
<parameter name="filePath">/home/prachwal/src/preact/preact-ui-components/.github/copilot-instructions.md