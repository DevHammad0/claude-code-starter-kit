#!/usr/bin/env node
/**
 * PreToolUse Hook: Auto-start dev servers detached
 *
 * Windows: Opens dev server in a new cmd window (non-blocking).
 * Unix/macOS: Runs dev server in a named tmux session (non-blocking),
 *             falls back to original command if tmux is not installed.
 *
 * Intercepts dev server commands (npm run dev, pnpm dev, yarn dev, bun run dev)
 * and transforms them to run detached so they don't block Claude Code.
 */

const path = require('path');
const { spawnSync } = require('child_process');

const MAX_STDIN = 1024 * 1024;
let data = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', chunk => {
  if (data.length < MAX_STDIN) {
    const remaining = MAX_STDIN - data.length;
    data += chunk.substring(0, remaining);
  }
});

process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(data);
    const cmd = input.tool_input?.command || '';

    // Detect dev server commands: npm run dev, pnpm dev, yarn dev, bun run dev
    const devServerRegex = /(npm run dev\b|pnpm( run)? dev\b|yarn dev\b|bun run dev\b)/;

    if (devServerRegex.test(cmd)) {
      // Get session name from current directory basename, sanitize for shell safety
      const rawName = path.basename(process.cwd());
      const sessionName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'dev';

      if (process.platform === 'win32') {
        // Windows: open in a new cmd window (non-blocking)
        const escapedCmd = cmd.replace(/"/g, '""');
        input.tool_input.command = `start "DevServer-${sessionName}" cmd /k "${escapedCmd}"`;
      } else {
        // Unix (macOS/Linux): use tmux if available
        const tmuxCheck = spawnSync('which', ['tmux'], { encoding: 'utf8' });
        if (tmuxCheck.status === 0) {
          const escapedCmd = cmd.replace(/'/g, "'\\''");
          const transformedCmd = `SESSION="${sessionName}"; tmux kill-session -t "$SESSION" 2>/dev/null || true; tmux new-session -d -s "$SESSION" '${escapedCmd}' && echo "[Hook] Dev server started in tmux session '${sessionName}'. View logs: tmux capture-pane -t ${sessionName} -p -S -100"`;
          input.tool_input.command = transformedCmd;
        }
        // else: tmux not found, pass through original command unchanged
      }
    }
    process.stdout.write(JSON.stringify(input));
  } catch {
    // Invalid input — pass through original data unchanged
    process.stdout.write(data);
  }
  process.exit(0);
});
