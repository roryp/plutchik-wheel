# AGENTS.md

This file provides context and instructions for AI coding agents working on the Plutchik Wheel Explorer project.

## Project Overview

An interactive visualization of Plutchik's Wheel of Emotions built with React 19, TypeScript, Vite 7, and D3.js. The wheel displays 8 primary emotions with intensity levels and dyad combinations.

## Setup Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Run linting: `npm run lint`

## Dev Environment Tips

- Use the DevContainer for consistent environment (Node.js 20 LTS)
- Dev server runs at `http://localhost:5173`
- Preview server runs at `http://localhost:4173`
- Use `@/` import alias for `src/` directory paths

## Code Style

- TypeScript strict mode enabled
- Use functional React components with hooks
- Prefer named exports over default exports
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Components in PascalCase, hooks as `use-kebab-case.ts`
- Use Tailwind CSS utility classes for styling

## Testing Instructions

- Test files are located in `src/lib/*.test.ts`
- Run tests with VS Code test runner
- Focus on testing emotion model logic in `emotionModel.ts`
- Ensure tests pass before committing changes

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components (don't modify directly)
│   ├── PlutchikWheel.tsx
│   ├── CenterHub.tsx
│   ├── DyadBrowser.tsx
│   └── SelectionPanel.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and models
│   ├── emotionModel.ts  # Core emotion data and logic
│   └── utils.ts         # Helper functions
└── styles/              # CSS and theme files
```

## Key Files

- `src/lib/emotionModel.ts` - Emotion data, colors, and calculation logic
- `src/components/PlutchikWheel.tsx` - Main D3.js wheel visualization
- `vite.config.ts` - Build configuration with path aliases
- `tailwind.config.js` - Tailwind CSS configuration

## Build and Deploy

```bash
# Docker production build
docker build -t plutchik-wheel .
docker run -p 8080:80 plutchik-wheel

# Azure Container Apps deployment
azd up
```

## Security Considerations

- No API keys or secrets in the codebase
- All dependencies pinned to specific versions
- Content Security Policy configured in nginx.conf
- No user data collection or storage

## PR Guidelines

- Title format: `[component] Brief description`
- Run `npm run lint` before committing
- Run `npm run build` to verify production build works
- Test responsiveness on different screen sizes
- Ensure accessibility with semantic HTML and ARIA labels

## Common Tasks

### Adding a new emotion or modifying the wheel
1. Edit `src/lib/emotionModel.ts` for data changes
2. Update `src/components/PlutchikWheel.tsx` for visual changes
3. Run tests to verify emotion calculations

### Adding a new UI component
1. Check if shadcn/ui has the component: use existing if available
2. Create new component in `src/components/`
3. Use Tailwind classes and `cn()` helper for styling

### Updating styles or theme
1. Edit `src/styles/theme.css` for CSS variables
2. Use `var(--color-name)` syntax in components
3. Test in both light and dark modes
