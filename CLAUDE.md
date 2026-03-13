# CLAUDE.md — Claude Code Starter Kit

A pre-configured Claude Code workspace with agents, skills, MCP servers, hooks, and rules ready to use. Clone → audit → build.

## Setup Rules (follow in order)

1. **Audit first** — archive anything irrelevant to your stack (`mv .claude/skills/X .claude/archive/`)
2. **Update stack** — edit `docs/development-stack.md` to reflect your actual tech
3. **Configure MCP** — copy `.mcp.json`, replace `YOUR_SUPABASE_PROJECT_REF` and other placeholders
4. **Update CLAUDE.md** — replace this file with your project identity, domain rules, and non-negotiables
5. **Initialize tasks** — create `tasks/todo.md` and `tasks/lessons.md` before first feature

## What's Included

| Category | Contents |
|----------|----------|
| Agents | planner, architect, tdd-guide, code-reviewer, security-reviewer, build-error-resolver, e2e-runner, refactor-cleaner, doc-updater |
| Skills | api-design, postgres-patterns, database-migrations, security-review, frontend-patterns, e2e-testing, tdd-workflow, docker-patterns, deployment-patterns, coding-standards |
| Commands | /plan, /tdd, /code-review, /build-fix, /e2e, /quality-gate, /refactor-clean, /verify, /test-coverage, /update-docs |
| MCP Servers | supabase, sequential-thinking, context7, magic, vercel, railway, shadcn |
| Rules | agents, coding-style, development-workflow, git-workflow, hooks, patterns, performance, security, testing |

## Workflow Orchestration

**Plan mode:** Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions). Write plan to `tasks/todo.md` with checkable items. Check in with user before implementation starts.

**Subagents:** Use subagents liberally. Keep the main context clean. Delegate research, review, and parallel work to agents rather than doing everything inline.

**Self-improvement loop:** After any user correction, immediately update `tasks/lessons.md`. Before starting new work, read `tasks/lessons.md` to apply prior lessons.

**Verification before done:** Never mark a task complete without proving it works. Run tests, check coverage, confirm the feature behaves as specified.

**Demand elegance:** For non-trivial changes, pause and ask "is there a more elegant way?" before writing. Simple solutions are always preferred over complex ones.

**Autonomous bug fixing:** When given a bug — fix it. Don't ask for clarification unless the reproduction steps are genuinely unclear.

## Task Management

1. Plan First — write plan to `tasks/todo.md` with checkable items
2. Verify Plan — check in with user before implementation
3. Track Progress — mark `[x]` complete as you go
4. Explain Changes — high-level summary at each meaningful step
5. Capture Lessons — update `tasks/lessons.md` after any correction

## Key Commands

```bash
/plan          # Plan before touching code
/tdd           # TDD workflow (tests first)
/code-review   # Quality review after writing code
/quality-gate  # Run all checks before marking phase complete
/update-docs   # Update docs after major features
```

## Docs

- `README.md` — full kit contents, how to adapt for a new project
- `docs/development-stack.md` — your tech choices (update this first)
- `docs/workflow.md` — feature loop, phase map, quick reference
