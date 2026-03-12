# Project Workflow Guide

How to use this starter kit effectively from project start to launch.

---

## Step 1 — Bootstrap (once per project)

Copy the kit into your new project:

```bash
cp -r claude-code-starter-kit/.claude your-project/
cp claude-code-starter-kit/.mcp.json your-project/
```

Then:
1. Open `.mcp.json` and replace `YOUR_SUPABASE_PROJECT_REF` with your actual Supabase project ref
2. Remove any MCP servers not relevant to your stack
3. Update `docs/development-stack.md` with your actual stack details

---

## Step 2 — Open Claude Code

```bash
cd your-project
claude
```

Claude Code will automatically load all agents, skills, rules, hooks, and MCP servers from `.claude/`.

---

## Step 3 — The Feature Loop

Every feature follows this exact sequence:

```
/plan  →  /tdd  →  /code-review  →  /verify  →  commit
```

| Step | Command | What happens |
|------|---------|-------------|
| 1 | `/plan <feature>` | Breaks down the feature, identifies risks, writes a step-by-step plan |
| 2 | `/tdd` | Writes tests first (RED), then implement to pass (GREEN), then refactor |
| 3 | `/code-review` | Reviews written code, flags CRITICAL/HIGH/MEDIUM issues |
| 4 | Auto | `security-reviewer` agent fires automatically for auth, uploads, user input |
| 5 | `/verify` | Checks implementation matches the original plan |
| 6 | `git commit` | Conventional commit: `feat:`, `fix:`, `refactor:`, `test:`, `chore:` |

---

## Step 4 — Agents Fire Automatically

You do not need to call agents manually. The rules in `.claude/rules/` instruct Claude when to delegate. These trigger without prompting:

| When you... | Agent that fires |
|-------------|----------------|
| Write or modify any code | `code-reviewer` |
| Touch auth, uploads, or user input | `security-reviewer` |
| Design API structure or DB schema | `architect` |
| Request a complex feature | `planner` |
| Hit a build or TypeScript error | `build-error-resolver` |
| Write a DB migration or PostGIS query | `database-reviewer` |
| Fix a bug or add a new feature | `tdd-guide` |

---

## Step 5 — MCP Servers Are Always Available

Use these during development without any setup — they're live as soon as Claude Code starts.

| You need to... | MCP server |
|---------------|-----------|
| Query or migrate the database | `supabase` |
| Add a shadcn/ui component | `shadcn` |
| Look up docs for any library | `context7` |
| Deploy or manage the frontend | `vercel` |
| Manage the backend service | `railway` |
| Add a Magic UI component | `magic` |
| Think through a complex problem | `sequential-thinking` |

---

## Step 6 — End of Each Phase

Run these before moving to the next development phase:

```bash
/update-docs      # update architecture documentation
/test-coverage    # verify you're at 80%+ coverage
/e2e              # run critical user flow tests with Playwright
/quality-gate     # final check — linting, types, tests, security
```

Do not proceed to the next phase until `/quality-gate` passes.

---

## Step 7 — End of Each Session

```bash
/learn                              # extract reusable patterns discovered this session
/sessions alias <id> <name>         # save the session with a memorable name
```

---

## Phase Map (for phased projects)

Apply the feature loop to each phase. Always start with `/plan` and end with `/quality-gate`.

| Phase | Start with | Key agents involved |
|-------|-----------|-------------------|
| Infrastructure | `/plan docker-setup` | `architect`, `database-reviewer` |
| Auth | `/plan auth-flow` | `security-reviewer`, `tdd-guide` |
| Core feature (e.g. listings) | `/plan listings-api` | `tdd-guide`, `database-reviewer` |
| Profiles & reputation | `/plan token-system` | `tdd-guide`, `code-reviewer` |
| Real-time (chat, notifications) | `/plan realtime-chat` | `architect`, `security-reviewer` |
| Admin dashboard | `/plan admin-dashboard` | `code-reviewer`, `security-reviewer` |
| Launch | `/e2e` then `/quality-gate` | `e2e-runner`, `refactor-cleaner` |

---

## Quick Reference

```
New project     →  copy kit + configure .mcp.json + update dev stack
New feature     →  /plan → /tdd → /code-review → /verify → commit
End of phase    →  /update-docs → /test-coverage → /e2e → /quality-gate
End of session  →  /learn → /sessions alias
```

---

## Key Rules

- **Always `/plan` before writing code** — never start implementing without a plan
- **Always `/tdd` for new features** — tests first, implementation second
- **Never skip `/quality-gate`** before moving phases — it catches what you miss
- **Trust the agents** — when `security-reviewer` or `code-reviewer` flags something, fix it before continuing
- **80% test coverage is the floor**, not the target
