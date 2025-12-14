# GitHub Copilot Instructions

## Project Overview

This is the **Plutchik Wheel Explorer** - an interactive visualization of Plutchik's Wheel of Emotions built with React 19 and TypeScript.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- **UI Components**: Radix UI primitives + shadcn/ui
- **Visualization**: D3.js for the emotion wheel
- **Animation**: Framer Motion
- **Deployment**: Azure Container Apps via `azd`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (do not modify directly)
│   ├── PlutchikWheel.tsx    # Main wheel visualization
│   ├── CenterHub.tsx        # Center hub component
│   ├── DyadBrowser.tsx      # Emotion dyad browser
│   └── SelectionPanel.tsx   # Selection panel
├── hooks/              # Custom React hooks
├── lib/                # Utilities and models
│   ├── emotionModel.ts # Emotion data and logic
│   └── utils.ts        # Helper functions (cn, etc.)
└── styles/             # CSS and theme files
```

## Coding Conventions

### TypeScript
- Use strict TypeScript with explicit types
- Prefer interfaces over types for object shapes
- Use `const` assertions for literal types
- Export types alongside components when needed

### React Components
- Use functional components with hooks
- Prefer named exports over default exports
- Use descriptive component names in PascalCase
- Keep components focused and single-responsibility

### Styling
- Use Tailwind CSS utility classes
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Follow the theme system in `src/styles/theme.css`
- Use CSS variables for colors: `var(--color-name)`

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utilities: `camelCase.ts`
- Tests: `*.test.ts`

## Import Aliases

Use the `@/` alias for imports from the `src` directory:

```typescript
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEmotions } from "@/hooks/use-emotions";
```

## UI Components (shadcn/ui)

Components in `src/components/ui/` are from shadcn/ui. When adding new UI:
1. Use existing shadcn/ui components when possible
2. Extend with Tailwind classes, don't modify source files
3. Compose components for complex UI patterns

## D3.js Visualization

The Plutchik wheel uses D3.js for SVG rendering:
- Keep D3 logic in dedicated functions
- Use React refs for DOM access
- Handle responsive sizing with ResizeObserver
- Animate with Framer Motion, not D3 transitions

## Commands

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## DevContainer

This project includes a DevContainer for consistent development:
- Node.js 20 LTS
- All VS Code extensions pre-configured
- Ports 5173 (dev) and 4173 (preview) auto-forwarded

## Azure Deployment

Deploy to Azure Container Apps:
```bash
azd up           # Full deployment
azd deploy       # Deploy only (after initial setup)
```

## Testing

- Test files go in `src/lib/*.test.ts`
- Run tests with the VS Code test runner
- Focus on testing emotion model logic

## Best Practices

1. **Keep the wheel responsive** - Test on different screen sizes
2. **Maintain accessibility** - Use semantic HTML, ARIA labels
3. **Optimize performance** - Memoize expensive calculations
4. **Follow existing patterns** - Match the codebase style
5. **Document complex logic** - Add comments for D3/emotion calculations
