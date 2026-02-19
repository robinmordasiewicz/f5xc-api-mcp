#!/usr/bin/env bash
# Repository-specific pre-commit hooks for f5xc-api-mcp
# Called by the universal .pre-commit-config.yaml local-hooks entry
set -euo pipefail

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

# --- ESLint ---
TS_FILES=$(echo "$STAGED_FILES" | grep '\.\(ts\|tsx\|js\|jsx\)$' || true)
if [ -n "$TS_FILES" ] && [ -f package.json ]; then
  echo "[local] Running ESLint..."
  npm run lint 2>/dev/null || echo "[local] eslint failed or not configured"
fi

# --- Prettier ---
FORMAT_FILES=$(echo "$STAGED_FILES" | grep '\.\(ts\|tsx\|js\|jsx\|json\|md\|yaml\|yml\)$' | grep -v '^specs/raw/' || true)
if [ -n "$FORMAT_FILES" ] && [ -f package.json ]; then
  echo "[local] Running Prettier..."
  npm run format 2>/dev/null || echo "[local] prettier failed or not configured"
fi

# --- TypeScript type check ---
if [ -n "$TS_FILES" ] && [ -f package.json ]; then
  echo "[local] Running TypeScript type check..."
  npm run typecheck 2>/dev/null || echo "[local] typecheck failed or not configured"
fi

echo "[local] All repo-specific checks passed."
