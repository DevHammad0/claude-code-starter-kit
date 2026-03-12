#!/usr/bin/env node
/**
 * PreToolUse Hook: Git push reminder
 *
 * Cross-platform (Windows, macOS, Linux)
 *
 * Logs a reminder before Claude runs git push so you can
 * review the changes about to be pushed.
 */

'use strict';

const MAX_STDIN = 1024 * 1024;
let raw = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  if (raw.length < MAX_STDIN) {
    const remaining = MAX_STDIN - raw.length;
    raw += chunk.substring(0, remaining);
  }
});

process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw);
    const cmd = String(input.tool_input?.command || '');
    if (/\bgit\s+push\b/.test(cmd)) {
      console.error('[Hook] Review changes before push...');
      console.error('[Hook] Continuing with push (remove this hook to disable this reminder)');
    }
  } catch {
    // ignore parse errors and pass through
  }

  process.stdout.write(raw);
});
