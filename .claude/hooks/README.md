# Hooks

Event-driven automations that fire before or after Claude Code tool executions. Enforce code quality, catch mistakes early, and automate repetitive checks during NearMe development.

## How Hooks Work

```
User request → Claude picks a tool → PreToolUse hook runs → Tool executes → PostToolUse hook runs
```

- **PreToolUse** hooks run before the tool executes. They can **block** (exit code 2) or **warn** (stderr, exit code 0).
- **PostToolUse** hooks run after the tool completes. They analyze output but cannot block.
- **Stop** hooks run after each Claude response.
- **SessionStart** hook runs when a new Claude Code session opens.
- **PreCompact** hook runs before context compaction to save state.

All hooks are plain Node.js scripts — no external packages, no bash dependency. Works natively on Windows.

---

## Hooks in This Folder

### SessionStart

| Hook | What It Does |
|------|-------------|
| `session-start.js` | Loads the most recent session summary from `~/.claude/sessions/` into Claude's context. Detects project type (FastAPI + Next.js → fullstack), package manager, and available session aliases. |

### PreToolUse

| Hook | Matcher | Behavior | Exit Code |
|------|---------|----------|-----------|
| `auto-tmux-dev.js` | `Bash` | Intercepts `npm run dev`, `pnpm dev`, `yarn dev`, `bun run dev` and opens them in a new `cmd` window on Windows so the dev server doesn't block Claude | 0 (non-blocking) |
| `pre-bash-git-push-reminder.js` | `Bash` | Logs a reminder before `git push` to review changes | 0 (warns) |
| `doc-file-warning.js` | `Write` | Warns when Claude writes a `.md`/`.txt` file outside allowed paths (`README.md`, `CLAUDE.md`, `docs/`, `memory/`, `.plan.md`) | 0 (warns) |
| `suggest-compact.js` | `Edit\|Write` | Tracks tool call count per session. Suggests `/compact` after 50 tool calls, then every 25. Override threshold with `COMPACT_THRESHOLD` env var | 0 (warns) |

### PostToolUse

| Hook | Matcher | What It Does |
|------|---------|-------------|
| `quality-gate.js` | `Edit\|Write\|MultiEdit` | Runs `ruff format --check` on `.py` files (FastAPI backend) and Prettier/Biome on `.ts/.tsx/.js/.jsx` files (Next.js frontend). Set `ECC_QUALITY_GATE_FIX=true` to auto-fix instead of check. Set `ECC_QUALITY_GATE_STRICT=true` to surface failures to stderr |
| `post-edit-format.js` | `Edit` | Auto-formats `.ts/.tsx/.js/.jsx` files immediately after edits. Auto-detects Biome (`biome.json`) or Prettier (`.prettierrc`) by walking up from the edited file |
| `post-edit-typecheck.js` | `Edit` | Runs `tsc --noEmit` after editing `.ts/.tsx` files. Walks up to find the nearest `tsconfig.json`. Reports only errors in the edited file. Uses `npx.cmd` on Windows |
| `post-edit-console-warn.js` | `Edit` | Warns with exact line numbers when `console.log` is found in the just-edited JS/TS file |

### PreCompact

| Hook | What It Does |
|------|-------------|
| `pre-compact.js` | Logs a compaction event to `~/.claude/sessions/compaction-log.txt` and marks the active session file so you know where context was summarized |

### Stop (after each response)

| Hook | What It Does |
|------|-------------|
| `check-console-log.js` | Scans all git-modified JS/TS files for `console.log`. Excludes test files, config files, and `scripts/` directories |
| `session-end.js` | Reads the session transcript to extract tasks requested, files modified, and tools used. Writes/updates a session file in `~/.claude/sessions/` for cross-session continuity |
| `cost-tracker.js` | Appends token counts and estimated USD cost to `~/.claude/metrics/costs.jsonl` after each response |

---

## Shared Libraries (`lib/`)

| File | Used By |
|------|---------|
| `lib/utils.js` | All hooks that need file I/O, git commands, session paths, or cross-platform helpers |
| `lib/package-manager.js` | `post-edit-format.js`, `session-start.js` — detects npm/pnpm/yarn/bun from lock files or config |
| `lib/session-aliases.js` | `session-start.js` — manages named session aliases in `~/.claude/session-aliases.json` |
| `lib/project-detect.js` | `session-start.js` — detects languages and frameworks (FastAPI, Next.js, etc.) from project files |

---

## Activation

Copy this `hooks/` folder to `nearme/.claude/hooks/` and place `settings.json` at `nearme/.claude/settings.json`.

```
nearme/
└── .claude/
    ├── hooks/
    │   ├── lib/
    │   │   ├── utils.js
    │   │   ├── package-manager.js
    │   │   ├── session-aliases.js
    │   │   └── project-detect.js
    │   ├── auto-tmux-dev.js
    │   ├── check-console-log.js
    │   ├── cost-tracker.js
    │   ├── doc-file-warning.js
    │   ├── post-edit-console-warn.js
    │   ├── post-edit-format.js
    │   ├── post-edit-typecheck.js
    │   ├── pre-bash-git-push-reminder.js
    │   ├── pre-compact.js
    │   ├── quality-gate.js
    │   ├── session-end.js
    │   ├── session-start.js
    │   └── suggest-compact.js
    └── settings.json
```

---

## Environment Variables

| Variable | Hook | Effect |
|----------|------|--------|
| `ECC_QUALITY_GATE_FIX` | `quality-gate.js` | Set to `true` to auto-fix instead of check |
| `ECC_QUALITY_GATE_STRICT` | `quality-gate.js` | Set to `true` to log formatter failures to stderr |
| `COMPACT_THRESHOLD` | `suggest-compact.js` | Override tool-call threshold for compact suggestion (default: `50`) |
| `CLAUDE_PACKAGE_MANAGER` | `session-start.js`, `post-edit-format.js` | Force a specific package manager (`npm`, `pnpm`, `yarn`, `bun`) |

---

## Disabling a Hook

Remove or comment out the hook entry in `settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [],
        "description": "Disabled: TypeScript check"
      }
    ]
  }
}
```

---

## Writing Your Own Hook

Hooks are Node.js scripts that receive tool input as JSON on stdin and must output JSON on stdout.

```javascript
// my-hook.js
let data = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  const input = JSON.parse(data);

  const toolName  = input.tool_name;       // "Edit", "Bash", "Write", etc.
  const toolInput = input.tool_input;      // tool-specific params
  const toolOutput = input.tool_output;   // PostToolUse only

  // Warn (non-blocking): write to stderr
  console.error('[Hook] Warning shown to Claude');

  // Block (PreToolUse only): exit with code 2
  // process.exit(2);

  // Always pass through the original data
  process.stdout.write(data);
});
```

**Exit codes:**
- `0` — success, continue
- `2` — block the tool call (PreToolUse only)
- Other non-zero — error (logged, does not block)

### Hook Input Schema

```typescript
interface HookInput {
  tool_name: string;           // "Bash", "Edit", "Write", "Read", etc.
  tool_input: {
    command?: string;          // Bash: the command being run
    file_path?: string;        // Edit/Write/Read: target file
    old_string?: string;       // Edit: text being replaced
    new_string?: string;       // Edit: replacement text
    content?: string;          // Write: file content
  };
  tool_output?: {              // PostToolUse only
    output?: string;
  };
}
```

### Async Hooks

For background checks that should not block Claude:

```json
{
  "type": "command",
  "command": "node \"D:/hammad/startup/nearme/.claude/hooks/my-hook.js\"",
  "async": true,
  "timeout": 30
}
```

---

## Common Recipes for NearMe

### Block Python files over 300 lines (keep FastAPI routers focused)

```json
{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const p=i.tool_input?.file_path||'';const c=i.tool_input?.content||'';if(/\\.py$/.test(p)&&c.split('\\n').length>300){console.error('[Hook] BLOCKED: Python file exceeds 300 lines — split into smaller modules');process.exit(2)}process.stdout.write(d)})\""
  }],
  "description": "Block Python files over 300 lines"
}
```

### Warn on hardcoded secrets

```json
{
  "matcher": "Edit|Write",
  "hooks": [{
    "type": "command",
    "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const content=(i.tool_input?.new_string||i.tool_input?.content||'');if(/sk-[a-zA-Z0-9]{20,}|password\\s*=\\s*['\\\"][^'\\\"]{6,}/.test(content)){console.error('[Hook] WARNING: Possible hardcoded secret detected — use environment variables')}process.stdout.write(d)})\""
  }],
  "description": "Warn on possible hardcoded secrets or API keys"
}
```

### Remind to write tests for new API routes

```json
{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "node -e \"const fs=require('fs');let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const p=i.tool_input?.file_path||'';if(/app\\/api\\/.*\\.py$/.test(p)&&!/test/.test(p)){const testPath=p.replace('/api/','/tests/').replace('.py','_test.py');if(!fs.existsSync(testPath)){console.error('[Hook] No test file for: '+p);console.error('[Hook] Expected: '+testPath)}}process.stdout.write(d)})\""
  }],
  "description": "Remind to create tests when adding new FastAPI route files"
}
```
