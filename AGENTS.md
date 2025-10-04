# AGENTS.md - Development Guidelines

## Build/Test/Lint Commands

- **Type check**: `bun check` (SvelteKit sync + svelte-check)
- **Format**: `bun format` (Prettier --write)
- **Lint**: `bun lint` (Prettier --check)

## Code Style Guidelines

- **Indentation**: Tabs (Prettier config)
- **Quotes**: Single quotes only
- **Semicolons**: Always use semicolons
- **Trailing commas**: None
- **Line width**: 100 characters max
- **TypeScript**: Strict mode enabled, bundler module resolution

## Project Structure

- **Framework**: SvelteKit with Vite
- **Styling**: TailwindCSS with PostCSS
- **Fonts**: Geist and GeistMono (custom fonts in static/)
- **Adapter**: Vercel deployment
- **Package manager**: bun (required)

## Import Conventions

- Use `$lib` alias for imports from `src/lib/`
- Component imports: `import Component from '$lib/components/Component.svelte'`
- Type imports: Use explicit `import type { Type }` syntax
- No default exports for components

## Component Patterns

- Use Svelte 5 runes (`$props()`, `$state()`)
- Prefer CSS-in-JS with Tailwind classes over separate styles
- Use `lang="postcss"` for style blocks when needed
- Accessibility: Include `sr-only` text for icon links
