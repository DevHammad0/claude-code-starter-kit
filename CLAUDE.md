# CLAUDE.md — Claude Code Starter Kit

A pre-configured Claude Code workspace. Clone → run setup → build.

## First-Time Setup (run once per machine)

```bash
bash scripts/setup.sh   # copies user-rules/ → ~/.claude/rules/ (applies to ALL projects)
```

Then for each new project:
1. **Audit** — archive anything irrelevant to your stack (`mv .claude/skills/X .claude/archive/`)
2. **Update stack** — edit `docs/development-stack.md` with your tech choices
3. **Configure MCP** — update `.mcp.json`, replace placeholder values
4. **Replace CLAUDE.md** — swap this file with your project identity and non-negotiables
5. **Add service CLAUDE.md files** — copy from `service-templates/` into `backend/`, `frontend/`, `auth/`
6. **Add path-scoped rules** — edit `.claude/rules/backend-standards.md` and `frontend-standards.md` for your stack
7. **Initialize tasks** — create `tasks/todo.md` and `tasks/lessons.md`

## What's Included

| Category | Contents |
|----------|----------|
| Agents | planner, architect, tdd-guide, code-reviewer, security-reviewer, build-error-resolver, e2e-runner, refactor-cleaner, doc-updater |
| Skills | api-design, postgres-patterns, database-migrations, security-review, frontend-patterns, e2e-testing, tdd-workflow, docker-patterns, deployment-patterns, coding-standards |
| Commands | /plan, /tdd, /code-review, /build-fix, /e2e, /quality-gate, /refactor-clean, /verify, /test-coverage, /update-docs |
| MCP Servers | supabase, sequential-thinking, context7, magic, vercel, railway, shadcn |
| Rules (project) | agents.md, hooks.md (always-loaded), backend-standards.md, frontend-standards.md (path-scoped) |
| Rules (user) | coding-style, git-workflow, development-workflow, patterns, performance, security, testing — installed via `scripts/setup.sh` |

## Rules Strategy

- **`~/.claude/rules/`** — generic rules that load for every project on your machine (set up once via `scripts/setup.sh`)
- **`.claude/rules/common/`** — always-loaded project rules (agents, hooks)
- **`.claude/rules/backend-standards.md`** — loads only when touching `backend/**/*.py`
- **`.claude/rules/frontend-standards.md`** — loads only when touching `frontend/**/*.{ts,tsx}`

## Workflow Orchestration

**Plan mode:** Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions). Write plan to `tasks/todo.md`. Check in with user before implementation starts.

**Subagents:** Use subagents liberally. Keep the main context clean. Delegate research, review, and parallel work to agents.

**Self-improvement loop:** After any user correction, immediately update `tasks/lessons.md`. Read it before starting new work.

**Verification before done:** Never mark a task complete without proving it works. Run tests, confirm the feature behaves as specified.

**Demand elegance:** For non-trivial changes, ask "is there a more elegant way?" before writing.

**Autonomous bug fixing:** When given a bug — fix it. Don't ask unless reproduction steps are genuinely unclear.

## Task Management

1. Plan First — write plan to `tasks/todo.md` with checkable items
2. Verify Plan — check in with user before implementation
3. Track Progress — mark `[x]` complete as you go
4. Capture Lessons — update `tasks/lessons.md` after any correction

## Docs

- `README.md` — full kit contents and how to adapt
- `docs/development-stack.md` — your tech choices (update first)
- `docs/workflow.md` — feature loop, phase map, quick reference
- `service-templates/` — CLAUDE.md templates for backend/, frontend/, auth/
- `user-rules/` — generic rules to install at `~/.claude/rules/`
