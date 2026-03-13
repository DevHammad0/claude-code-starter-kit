# Claude Code Starter Kit

A pre-configured Claude Code workspace with agents, skills, MCP servers, hooks, and rules. Clone once, use for every project.

## Quick Start

```bash
git clone https://github.com/DevHammad0/claude-code-starter-kit my-project
cd my-project
bash scripts/setup.sh   # one-time: installs generic rules to ~/.claude/rules/
```

Then open the project in Claude Code and follow the setup checklist in `CLAUDE.md`.

## How It Works

### Rules Strategy (Context Engineering)

Rules are split into three layers to minimize unnecessary context token usage:

| Layer | Location | Loads When |
|-------|----------|------------|
| **User-level** | `~/.claude/rules/` | Every session, every project on this machine |
| **Always-on project** | `.claude/rules/common/` | Every session in this project |
| **Path-scoped** | `.claude/rules/backend-standards.md` | Only when touching `backend/**/*.py` |
| **Path-scoped** | `.claude/rules/frontend-standards.md` | Only when touching `frontend/**/*.{ts,tsx}` |
| **Service-specific** | `backend/CLAUDE.md`, `frontend/CLAUDE.md` | Only when working in that directory |

This means Claude only sees rules relevant to what it's actually working on — less noise, better adherence.

### `user-rules/` — Generic rules (install once)

```bash
bash scripts/setup.sh
```

Copies 7 generic rules to `~/.claude/rules/`:
- `coding-style.md` — immutability, error handling, file size limits
- `git-workflow.md` — conventional commits, PR process
- `development-workflow.md` — research → plan → TDD → review loop
- `patterns.md` — repository pattern, API response format
- `performance.md` — model selection, context window management
- `security.md` — OWASP checklist, secret management
- `testing.md` — TDD workflow, 80% coverage requirement

These apply to **every project** on your machine. Run setup once; never copy them per-project.

### `.claude/rules/` — Project rules

Always-loaded (no `paths` frontmatter):
- `common/agents.md` — agent list and when to use each
- `common/hooks.md` — hook behavior guidance

Path-scoped (edit for your stack):
- `backend-standards.md` — loads on `backend/**/*.py`
- `frontend-standards.md` — loads on `frontend/**/*.{ts,tsx}`

### `service-templates/` — Subdirectory CLAUDE.md starters

Copy into your actual service directories:

```bash
cp service-templates/backend/CLAUDE.md backend/CLAUDE.md
cp service-templates/frontend/CLAUDE.md frontend/CLAUDE.md
cp service-templates/auth/CLAUDE.md auth/CLAUDE.md
```

Edit each with your service-specific commands, structure, and constraints. These load on demand only when Claude works in that directory.

---

## Included Tools

### Agents (`.claude/agents/`)

| Agent | When to use |
|-------|-------------|
| `planner` | Complex features, new phases, breaking down tasks |
| `architect` | API structure, DB schema, system design |
| `tdd-guide` | Any new feature or bug fix |
| `code-reviewer` | After writing or modifying any code |
| `security-reviewer` | Auth flow, file upload, user input |
| `database-reviewer` | Schema design, migrations, query optimization |
| `build-error-resolver` | TypeScript/Python build errors |
| `e2e-runner` | Critical user flows needing Playwright tests |
| `refactor-cleaner` | Dead code cleanup before releases |
| `doc-updater` | After major features |

### Skills (`.claude/skills/`)

| Skill | Purpose |
|-------|---------|
| `api-design` | REST endpoint design, pagination, filtering |
| `postgres-patterns` | PostGIS, query optimization, indexing |
| `database-migrations` | Alembic/Prisma migration patterns |
| `security-review` | Auth checklist, input validation, upload security |
| `frontend-patterns` | React/Next.js, Server vs Client Components |
| `e2e-testing` | Playwright patterns, Page Object Model |
| `tdd-workflow` | TDD with pytest and Playwright |
| `docker-patterns` | Multi-stage Dockerfile, compose setup |
| `deployment-patterns` | Vercel + Railway deployment |
| `coding-standards` | Universal clean code rules |
| `better-auth-best-practices` | Better Auth server/client setup |
| `fastapi-templates` | Production-ready FastAPI scaffolds |
| `shadcn` | shadcn/ui component management |
| `vercel-react-best-practices` | Next.js performance patterns |

### Commands (`.claude/commands/`)

| Command | What it does |
|---------|-------------|
| `/plan` | Plan before touching code — writes to `tasks/todo.md` |
| `/tdd` | TDD workflow: tests first, then implement |
| `/code-review` | Quality review after writing code |
| `/build-fix` | Fix TypeScript/Python build errors |
| `/e2e` | Generate and run Playwright E2E tests |
| `/quality-gate` | Run all checks before marking phase complete |
| `/refactor-clean` | Clean dead code |
| `/verify` | Verify implementation against plan |
| `/test-coverage` | Check test coverage report |
| `/update-docs` | Update architecture docs after features |

### MCP Servers (`.mcp.json`)

| Server | Purpose |
|--------|---------|
| `supabase` | DB management, migrations, edge functions |
| `sequential-thinking` | Complex multi-step reasoning |
| `context7` | Up-to-date library documentation |
| `magic` | UI component generation |
| `vercel` | Deployment management |
| `railway` | Backend deployment |
| `shadcn` | shadcn/ui component search |

### Hooks (`.claude/hooks/`)

| Hook | What it does |
|------|-------------|
| `post-edit-format.js` | Auto-formats after file edits |
| `post-edit-typecheck.js` | Runs `tsc --noEmit` after TS edits |
| `post-edit-console-warn.js` | Warns if `console.log` left in prod code |
| `pre-bash-git-push-reminder.js` | Reminds to check tests before push |
| `cost-tracker.js` | Tracks API usage cost per session |
| `suggest-compact.js` | Suggests `/compact` near context limit |
| `auto-tmux-dev.js` | Opens dev server in new terminal window |
| `session-start.js` | Detects package manager, sets aliases |
| `session-end.js` | Summary of session work |

---

## Setup Checklist (per new project)

- [ ] `bash scripts/setup.sh` — install user-level rules (once per machine)
- [ ] Edit `docs/development-stack.md` — document your actual tech choices
- [ ] Update `.mcp.json` — replace placeholder values
- [ ] Replace root `CLAUDE.md` — project identity + non-negotiables
- [ ] Copy `service-templates/` → service directories, fill in details
- [ ] Edit `.claude/rules/backend-standards.md` — your backend rules
- [ ] Edit `.claude/rules/frontend-standards.md` — your frontend rules
- [ ] Audit `.claude/skills/` — archive anything not relevant to your stack
- [ ] Create `tasks/todo.md` and `tasks/lessons.md`
- [ ] Copy `.gitignore` template and extend for your project

---

## Docs

- `docs/development-stack.md` — tech stack template
- `docs/workflow.md` — feature loop, phase map, quick reference
- `service-templates/` — CLAUDE.md templates for each service
- `user-rules/` — generic rules installed via `scripts/setup.sh`
