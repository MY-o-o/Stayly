<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stayly project notes

- **Project:** Stayly — an Airbnb-style vacation rental marketplace.
- **Stack:** Next.js App Router with TypeScript and Tailwind CSS on the frontend; a C# backend will provide the API layer.
- **Architecture:** The current scope is frontend-only. Keep data access and UI composition separate so API routes can be connected to the C# backend later without rewriting views.
- **Standards:** TypeScript strict mode, Tailwind utility-first styling, and small composable components. Prefer accessible semantic HTML, labelled controls, and keyboard-friendly interactions.
- **Naming:** Use PascalCase filenames for React components and camelCase filenames for utilities and hooks.
