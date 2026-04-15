<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Agent Guide — Aurélia Salon Web App

## Stack

- Next.js 16, App Router, TypeScript 5
- Tailwind CSS v4 (no `tailwind.config.js` — configured via `postcss.config.mjs`)
- Framer Motion 12 for animations
- React Hook Form + Zod for form validation
- Vercel Analytics (`@vercel/analytics`)

## Key Conventions

### Content

- All site content is in `lib/content-mock.json`. Never hardcode copy in components.
- Use the `useContent` hook from `lib/useContent.ts` to access content with types from `types/content.ts`.

### Components

- Page-level components live in `components/sections/` and are imported by the corresponding `app/*/page.tsx`.
- Reusable UI primitives live in `components/ui/`.
- Layout components (Navbar, Footer) live in `components/layout/`.

### Animations

- Use `AnimatedSection` for scroll-triggered fade/slide-in effects.
- Use `useScrollAnimation` hook for custom scroll-based logic.
- Use `useMouseParallax` hook for mouse-tracking parallax effects.
- Use `ParallaxLayer` and `Card3D` for 3D interactive elements.

### Forms

- All forms use `react-hook-form` with `@hookform/resolvers/zod` for schema validation.
- Define Zod schemas inline in the section component file.

### Styling

- Use Tailwind utility classes only. No custom CSS except in `globals.css`.
- CSS variables for fonts: `--font-playfair`, `--font-inter`.

## File Patterns

```
app/[route]/page.tsx          → imports from components/sections/[Route]Page.tsx
components/sections/*.tsx     → full page content components
components/ui/*.tsx           → small reusable primitives
hooks/use*.ts                 → custom React hooks
lib/content-mock.json         → all site content
types/content.ts              → TypeScript interfaces for content
```

## Formatting

- Prettier is configured in `.prettierrc` with `prettier-plugin-tailwindcss` for automatic Tailwind class sorting.
- Run `npm run format` before committing to auto-fix all files.
- Run `npm run format:check` in CI to verify formatting.
- Do not manually reorder Tailwind classes — the plugin handles it.

## Do Not

- Do not add `tailwind.config.js` — Tailwind v4 uses PostCSS config.
- Do not hardcode text content in components — use `content-mock.json`.
- Do not create new pages without a corresponding section component in `components/sections/`.
- Do not use the `pages/` directory — this project uses the App Router exclusively.
- Do not install a separate analytics library — Vercel Analytics is already configured.
