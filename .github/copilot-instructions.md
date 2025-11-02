# Preact UI Components - AI Coding Guidelines

## Architecture Overview
**Preact UI component library** built with Vite and Storybook. Components in `/src/stories/` with stories and MDX docs.

**Key decisions:**
- Preact with React compatibility (`"react": ["./node_modules/preact/compat/"]`)
- TypeScript with project references
- MDX docs with Storybook canvases
- All components use .tsx with React.FC typing

## Component Development
```typescript
export interface ComponentProps { /* props */ }
export const Component: React.FC<ComponentProps> = ({ /* props */ }) => { /* JSX */ }
```

**Workflow:**
1. Create `Component.tsx` in `/src/stories/`
2. Add `component.css` (storybook-* classes)
3. Create `Component.stories.tsx` (CSF 3.0)
4. Document in `Component.mdx` (`<Canvas>`, `<ArgTypes>`)

## Key Commands
- `npm run dev` - Vite dev server
- `npm run storybook` - Storybook dev (port 6006)
- `npm run build` - TypeScript + Vite build
- `npm run build-storybook` - Storybook to `dist/storybook/`
- `npm run lint` - ESLint checks
- `npm run test` - Vitest tests

## Testing Setup
- **Framework**: Vitest with jsdom
- **Library**: @testing-library/preact
- **Coverage**: V8 provider to `dist/coverage/`
- **Setup**: `src/test/setup.ts` with cleanup

## CI/CD
- **GitLab CI**: `.gitlab-ci.yml` (Node.js 22, GitLab Pages deploy)
- **GitHub Actions**: `.github/workflows/ci.yml` (Node.js 22, GitHub Pages deploy)
- **Outputs**: App to `dist/`, Storybook to `dist/storybook/`

## Code Conventions
- **Props**: React.FC typing, JSDoc comments, `[key: string]: any` for extras
- **CSS**: `storybook-component--variant` pattern
- **Imports**: Relative paths, components import own CSS
- **Stories**: CSF 3.0 format with TypeScript interfaces

## Key Files
- `vite.config.ts` - Vite + Vitest config
- `.storybook/main.ts` - Storybook config
- `tsconfig.app.json` - TypeScript app config
- `src/test/setup.ts` - Test setup
- `.gitlab-ci.yml` & `.github/workflows/ci.yml` - CI/CD configs
