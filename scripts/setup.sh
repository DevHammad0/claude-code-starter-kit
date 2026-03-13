#!/usr/bin/env bash
# ============================================================
# Claude Code Starter Kit — One-time setup
# Copies generic rules to ~/.claude/rules/ so they apply
# to ALL your projects, not just this one.
# Run once: bash scripts/setup.sh
# ============================================================

set -e

RULES_DIR="$HOME/.claude/rules"
USER_RULES_SRC="$(cd "$(dirname "$0")/.." && pwd)/user-rules"

echo "Setting up user-level Claude rules..."
mkdir -p "$RULES_DIR"

for file in "$USER_RULES_SRC"/*.md; do
  filename=$(basename "$file")
  if [ -f "$RULES_DIR/$filename" ]; then
    echo "  SKIP  $filename (already exists — edit manually if needed)"
  else
    cp "$file" "$RULES_DIR/$filename"
    echo "  COPY  $filename → $RULES_DIR/$filename"
  fi
done

echo ""
echo "Done. Rules in ~/.claude/rules/ apply to every project on this machine."
echo "Edit them at: $RULES_DIR"
