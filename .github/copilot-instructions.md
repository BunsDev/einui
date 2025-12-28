# GitHub Copilot / AI Agent Instructions for Ein UI

Quick, actionable guidance for AI agents making code changes in this repo. Keep edits focused, small PRs, and reference the docs/examples when adding or changing components.

## Project at-a-glance
- Next.js 16 app-router site with a component registry (shadcn format). Main app lives in `app/` (server + client components).
- UI components are implemented with Tailwind v4, Radix primitives, `class-variance-authority` (CVA) and `cn` helper (`/lib/utils.ts`).
- Components are published/registered via `registry.json` and files under `registry/` (groups: `liquid-glass`, `innovative`, `widgets`, `blocks`).

## Key workflows & commands
- Local dev: `pnpm dev` (or `npm run dev`) — Next app on http://localhost:3000
- Build: `pnpm build` → `next build`
- Start (prod): `pnpm start` → `next start`
- Lint: `pnpm lint` (ESLint config in repo root)
- Registry build/search helper: `pnpm registry:build`, `pnpm registry:search` (uses `shadcn` CLI)
- Bundle analyzer: `pnpm analyze`

## Important conventions (do not break)
- Imports use the path alias `@/*` (configured in `tsconfig.json`) — prefer `@/components/...` or `@/registry/...`.
- File naming: registry components use kebab-case (e.g., `glass-dock.tsx`) and export named components (`export { GlassDock }`).
- Client vs. Server components: Add the `"use client"` directive at top for interactive components that use hooks or DOM APIs.
- Styling: prefer Tailwind utility classes; use `cva` for variants + `VariantProps` types; use `cn(...)` to merge classes (twMerge + clsx) to avoid class duplication.
- Example docs: Components must include docs under `app/docs/components/<slug>/page.tsx` using `ComponentPreview` and `CLIInstall` components for consistent documentation and install instructions.

## Adding or updating a component (step-by-step)
1. Create component implementation in `registry/<group>/your-component.tsx` and export it (named export). Keep props typed and add `displayName` for React devtools.
2. Add entry to `registry.json` with `name`, `type`, `title`, `description`, `dependencies` and `files` (path must point to the file in the repo). If the component depends on another registry item, use `registryDependencies`.
3. Add a docs page under `app/docs/components/<slug>/page.tsx` with:
   - `PageHeader`, `CLIInstall componentName="<name>"`, and `ComponentPreview` examples.
   - Provide `code` strings that show correct imports (e.g., `import { GlassDock } from "@/registry/innovative/glass-dock"`).
4. Run `pnpm lint` and `pnpm build` (type-checks) and `pnpm registry:build` if you changed `registry.json`.

## Patterns & idioms to follow
- Export types where helpful: e.g., `export type { DockItem }` so docs and other components can import types safely.
- Interactive UI: keep logic inside client components and keep server components pure; prefer small focused hooks/files in `hooks/` when reused.
- Icons: use `lucide-react` icons and pass them as JSX props (observe `GlassDock` examples).
- Accessibility: prefer Radix primitives and include `aria-*` attributes (e.g., `role="toolbar"`, `aria-label`).

## Avoid common mistakes
- Missing `"use client"` at the top when using state/hooks or DOM APIs causes runtime errors in Next.js 16 app router.
- Forgetting to add dependencies to `registry.json`'s `dependencies` array (or `registryDependencies`) — this breaks the `shadcn` registry consumers.
- Not updating docs: each component must have at least one `ComponentPreview` demonstrating intended use.

## Tests & quality
- The repo currently relies on TypeScript checks and ESLint. Add tests when behavior is non-trivial and update docs accordingly.
- Run `pnpm lint` and `pnpm build` locally before creating PRs.

## Helpful files to inspect when modifying the repo
- `package.json` (scripts & dev flow)
- `tsconfig.json` (alias `@/*`)
- `registry.json` (component registry manifest)
- `registry/` (component implementations grouped by category)
- `app/docs/components/*` (documentation templates & examples)
- `components/docs/*` (helpers: `component-preview.tsx`, `cli-install.tsx`, `page-header.tsx`)
- `lib/utils.ts` (`cn` helper)

## Pull Request etiquette for AI agents
- Keep changes scoped to a single concern (component, doc, or fix).
- Include updated docs/screenshots and example usage in the PR description.
- Run `pnpm lint` and `pnpm build` locally and include that in the PR checklist.

---
If anything above is unclear or you'd like more examples (e.g., a minimal component + docs PR template), tell me which area to expand. Please review and suggest edits. 👇