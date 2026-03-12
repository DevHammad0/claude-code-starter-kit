# Claude Code Starter Kit

A production-ready Claude Code configuration for full-stack web projects. Built and refined during the NearMe campus marketplace project.

**Stack this kit is optimized for:**
Next.js (App Router) + FastAPI (Python) + Better Auth + Supabase (PostgreSQL + PostGIS + Realtime + Storage) + Docker + Vercel + Railway

---

## What's Included

```
claude-code-starter-kit/
├── README.md                        ← You are here
├── docs/
│   └── development-stack.md         ← Stack reference (update per project)
├── .mcp.json                        ← MCP server configs (update project refs)
└── .claude/
    ├── settings.json                ← Claude Code settings
    ├── agents/                      ← 10 specialized subagents
    ├── commands/                    ← 14 slash commands
    ├── skills/                      ← 27 domain knowledge skills
    ├── contexts/                    ← 3 mode contexts (dev, research, review)
    ├── rules/                       ← Always-on guidelines (common + typescript)
    └── hooks/                       ← Automated hook workflows
```

---

## How to Use for a New Project

1. Copy this entire kit into your project root:
   ```bash
   cp -r claude-code-starter-kit/.claude your-new-project/
   cp claude-code-starter-kit/.mcp.json your-new-project/
   ```

2. Configure `.mcp.json` — replace placeholders:
   - `YOUR_SUPABASE_PROJECT_REF` → your Supabase project ref (from project URL)
   - Remove any MCP servers not relevant to your stack

3. Update `development-stack.md` with your project's actual stack.

4. Open your project in Claude Code and start building.

---

## Agents (`agents/`)

Specialized subagents that Claude delegates to automatically.

| Agent | Purpose | Auto-triggers when |
|-------|---------|-------------------|
| `planner` | Implementation planning | Complex feature requests |
| `architect` | System design | Architectural decisions |
| `tdd-guide` | Test-driven development | New features, bug fixes |
| `code-reviewer` | Code quality | After writing/modifying code |
| `security-reviewer` | Vulnerability detection | Auth, uploads, user input, APIs |
| `build-error-resolver` | Fix build/type errors | Build fails |
| `e2e-runner` | Playwright E2E testing | Critical user flows |
| `database-reviewer` | PostgreSQL/Supabase | Schema design, migrations, PostGIS |
| `refactor-cleaner` | Dead code cleanup | Code maintenance |
| `doc-updater` | Documentation | After major features |

---

## Commands (`commands/`)

Slash commands invoked during development sessions.

| Command | What it does |
|---------|-------------|
| `/plan` | Plan a feature before touching code |
| `/tdd` | TDD workflow — tests first, then implement |
| `/code-review` | Quality review of written code |
| `/build-fix` | Fix TypeScript or Python build errors |
| `/e2e` | Generate and run Playwright E2E tests |
| `/quality-gate` | Run all quality checks |
| `/verify` | Verify implementation against plan |
| `/test-coverage` | Check test coverage report |
| `/refactor-clean` | Remove dead code |
| `/update-docs` | Update architecture documentation |
| `/update-codemaps` | Regenerate codemaps |
| `/learn` | Extract reusable patterns from this session |
| `/skill-create` | Generate skills from git history |
| `/sessions` | Manage and alias past Claude Code sessions |

---

## Skills (`skills/`)

Domain knowledge loaded on demand. Grouped by concern:

### Authentication
- `better-auth-best-practices` — Server/client config, adapters, sessions, plugins
- `better-auth-security-best-practices` — Rate limiting, CSRF, secrets, cookies, audit logs
- `create-auth-skill` — Scaffold Better Auth in a new project
- `email-and-password-best-practices` — Email verification, password reset, policies

### Backend
- `fastapi-templates` — Production-ready FastAPI with async, DI, error handling
- `api-design` — REST patterns, pagination, filtering, versioning, rate limiting
- `backend-patterns` — Architecture, DB optimization, server-side best practices
- `database-migrations` — Alembic/Prisma/Drizzle migration patterns, rollbacks
- `postgres-patterns` — PostGIS queries, schema design, indexing, Supabase patterns

### Frontend
- `shadcn` — shadcn/ui components, registry, styling, composition
- `frontend-patterns` — React/Next.js, state management, performance
- `frontend-design` — Production-grade UI, polished components
- `vercel-react-best-practices` — Next.js performance, Server Components, bundle optimization
- `ui-ux-pro-max` — 50 styles, 21 palettes, 50 font pairings, full design intelligence
- `web-design-guidelines` — Accessibility, UX review, best practices

### Infrastructure & Deployment
- `docker-patterns` — Multi-stage builds, Docker Compose, networking, volumes
- `multi-stage-dockerfile` — Optimized Dockerfiles for any language/framework
- `deployment-patterns` — CI/CD, health checks, rollbacks, Vercel + Railway
- `deploy-to-vercel` — Deploy to Vercel, preview deployments

### Testing
- `tdd-workflow` — TDD with pytest and Vitest/Jest, 80%+ coverage
- `e2e-testing` — Playwright patterns, Page Object Model, CI integration
- `playwright-cli` — Browser automation, screenshots, form filling

### Security
- `security-review` — OWASP checklist, auth, input validation, upload security
- `security-scan` — Scan Claude config for misconfigurations and injection risks

### General
- `coding-standards` — TypeScript/JavaScript/Python clean code rules
- `fetch-library-docs` — Pull official docs for any library via context7
- `search-first` — Research before coding, find existing solutions
- `interview` — Discovery conversations to clarify intent before building
- `verification-loop` — Comprehensive session verification system

---

## MCP Servers (`.mcp.json`)

| Server | Purpose | Config needed |
|--------|---------|--------------|
| `supabase` | DB, Storage, Realtime, Edge Functions | Replace `YOUR_SUPABASE_PROJECT_REF` |
| `magic` | Magic UI components | None |
| `sequential-thinking` | Complex multi-step reasoning | None |
| `vercel` | Deploy, domains, project management | Auth via `vercel login` |
| `railway` | Backend deployment | Auth via `railway login` |
| `shadcn` | Component search, examples | None |
| `context7` | Library documentation | None |

---

## Hooks (`.claude/hooks/`)

Automated workflows that run on Claude Code events:

| Hook | Trigger | What it does |
|------|---------|-------------|
| Auto-tmux | PreToolUse (Bash) | Starts dev servers in tmux with session names |
| Tmux reminder | PreToolUse (Bash) | Reminds to use tmux for long-running commands |
| Git push reminder | PreToolUse (Bash) | Review reminder before git push |
| Doc file warning | PreToolUse (Write) | Warns about non-standard doc files |
| Suggest compact | PreToolUse (Edit/Write) | Suggests manual compaction at logical intervals |
| Quality gate | PostToolUse (Edit/Write) | Runs quality checks after file edits |
| Auto-format | PostToolUse (Edit) | Formats JS/TS via Biome or Prettier |
| TypeScript check | PostToolUse (Edit) | Type-checks .ts/.tsx after edits |
| Console.log warn | PostToolUse (Edit) | Warns about console.log in edited files |
| PR logger | PostToolUse (Bash) | Logs PR URL after creation |
| Session persistence | Stop / SessionEnd | Saves session state |
| Cost tracker | Stop | Tracks token and cost metrics |
| Continuous learning | Pre/PostToolUse | Captures patterns for learning |

---

## Rules (`.claude/rules/`)

Always-on guidelines loaded into every session:

- `common/agents.md` — Agent orchestration rules, parallel execution patterns
- `common/coding-style.md` — Immutability, file organization, error handling
- `common/development-workflow.md` — Research → Plan → TDD → Review → Commit
- `common/git-workflow.md` — Conventional commits, PR process
- `common/hooks.md` — Hook system best practices
- `common/patterns.md` — Repository pattern, API response format, skeleton projects
- `common/performance.md` — Model selection, context management, extended thinking
- `common/security.md` — Pre-commit checklist, secret management
- `common/testing.md` — 80% coverage minimum, TDD workflow
- `typescript/coding-style.md` — TypeScript-specific style rules
- `typescript/hooks.md` — React hooks patterns
- `typescript/patterns.md` — TypeScript design patterns
- `typescript/security.md` — Frontend security (XSS, CSRF, input sanitization)
- `typescript/testing.md` — Vitest/Jest/Playwright patterns

---

## Development Workflow (built into this kit)

Every feature follows this sequence:

```
1. /plan       → Break down the feature, identify risks
2. /tdd        → Write tests first (RED → GREEN → IMPROVE)
3. /code-review → Address CRITICAL/HIGH issues
4. security-reviewer agent → For auth, uploads, user input
5. /e2e        → Cover critical user flows
6. git commit  → Conventional commits (feat:, fix:, etc.)
```

---

## Adapting for a Different Stack

This kit works well beyond the NearMe stack. For other setups:

| You're using | Consider adding / swapping |
|-------------|---------------------------|
| Django instead of FastAPI | Replace `fastapi-templates` skill |
| Prisma instead of SQLAlchemy | Update `database-migrations` skill |
| Clerk instead of Better Auth | Archive Better Auth skills |
| AWS instead of Railway | Archive `railway` MCP, add AWS |
| Drizzle ORM | Update `database-migrations` skill |
| Vue/Nuxt instead of Next.js | Archive `vercel-react-best-practices` |

Archive anything that doesn't fit — don't delete. Keep the archive inside `.claude/archive/` so you can restore later.
