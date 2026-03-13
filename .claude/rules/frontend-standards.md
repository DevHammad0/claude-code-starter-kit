---
paths:
  - "frontend/**/*.ts"
  - "frontend/**/*.tsx"
---

# Frontend Standards

## Replace this file with your frontend rules scoped to TypeScript files.
## These only load when Claude touches frontend/**/*.{ts,tsx} files.

## Example rules for Next.js + TypeScript:

### TypeScript
- Strict mode always — zero `any` types
- Auto-generate API types from backend OpenAPI spec

### Components
- Server Components by default
- `"use client"` only for: event handlers, hooks, browser APIs

### State
- Immutability: always spread/create new objects, never mutate state
- No inline styles — Tailwind classes only

### Commands
- Dev: `pnpm dev`
- Tests: `pnpm playwright test`
- Type check: `pnpm tsc --noEmit`
