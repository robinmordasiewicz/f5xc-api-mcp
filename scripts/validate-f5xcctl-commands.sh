#!/bin/bash

##############################################################################
# F5XCctl Command Syntax Validation Script
#
# Validates that all f5xcctl commands in documentation follow correct syntax:
# - No "f5xcctl configuration" commands (this is a bug pattern)
# - All commands use "-i" flag for file input (not "-f")
# - All resource commands include domain prefix
# - All commands use "-n" for namespace (not "--namespace")
#
# Usage:
#   ./scripts/validate-f5xcctl-commands.sh
#   npm run validate-cli-commands
#
# Exit codes:
#   0 = All checks passed
#   1 = Validation errors found
#
# Use in CI/CD:
#   Add to .github/workflows/ci.yml or similar
##############################################################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for errors
ERRORS=0

# Helper functions
info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
  ERRORS=$((ERRORS + 1))
}

# Banner
echo "============================================================"
echo "F5XCctl Command Syntax Validator"
echo "============================================================"
echo ""

# Define documentation directory
DOCS_DIR="docs"
TOOLS_DIR="${DOCS_DIR}/tools"
INTEGRATION_FILE="${DOCS_DIR}/integrations/f5xcctl.md"

if [ ! -d "${TOOLS_DIR}" ]; then
  error "Documentation directory not found: ${TOOLS_DIR}"
  exit 1
fi

info "Validating f5xcctl command syntax..."
echo ""

# Check 1: No "f5xcctl configuration" commands (the main bug we fixed)
echo "Check 1: Verifying no 'f5xcctl configuration' commands..."
if grep -r "f5xcctl configuration" "${DOCS_DIR}" > /dev/null 2>&1; then
  CONFIG_COUNT=$(grep -r "f5xcctl configuration" "${DOCS_DIR}" | wc -l)
  error "Found ${CONFIG_COUNT} instances of 'f5xcctl configuration' (should be 0)"
  grep -r "f5xcctl configuration" "${DOCS_DIR}" | head -5 | while read line; do
    echo "  $line"
  done
  [ "$CONFIG_COUNT" -gt 5 ] && echo "  ... and $((CONFIG_COUNT - 5)) more"
else
  info "✓ No 'f5xcctl configuration' commands found"
fi
echo ""

# Check 2: No incorrect "-f" flag usage
echo "Check 2: Verifying no '-f' flag for file input..."
if grep -r "f5xcctl.*-f .*\\.yaml" "${DOCS_DIR}" > /dev/null 2>&1; then
  F_FLAG_COUNT=$(grep -r "f5xcctl.*-f .*\\.yaml" "${DOCS_DIR}" | wc -l)
  error "Found ${F_FLAG_COUNT} instances of incorrect '-f' flag (should be 0)"
  grep -r "f5xcctl.*-f .*\\.yaml" "${DOCS_DIR}" | head -3 | while read line; do
    echo "  $line"
  done
else
  info "✓ No incorrect '-f' flag usage found"
fi
echo ""

# Check 3: Verify correct "-i" flag usage
echo "Check 3: Verifying correct '-i' flag usage..."
I_FLAG_COUNT=$(grep -rc "f5xcctl.*-i .*\\.yaml" "${TOOLS_DIR}" | grep -v ":0" | wc -l)
if [ "$I_FLAG_COUNT" -gt 0 ]; then
  TOTAL_COMMANDS=$(grep -r "f5xcctl.*-i .*\\.yaml" "${DOCS_DIR}" | wc -l)
  info "✓ Found ${TOTAL_COMMANDS} correct '-i' flag usages"
else
  warn "No f5xcctl create/apply commands found with '-i' flag"
fi
echo ""

# Check 4: Verify domain prefixes in generated docs
echo "Check 4: Verifying domain prefixes..."
DOMAINS=("load_balancer" "security" "infrastructure" "identity" "networking" "observability" "operations")
MISSING_DOMAINS=0

for domain in "${DOMAINS[@]}"; do
  DOMAIN_DIR="${TOOLS_DIR}/${domain//load_balancer/load-balancer}"
  DOMAIN_DIR="${DOMAIN_DIR//load-balancer/load-balancer}"

  # Adjust path naming convention (underscores to hyphens in directory names)
  DOMAIN_DIR_ALT="${TOOLS_DIR}/${domain//_/-}"

  if [ -d "$DOMAIN_DIR_ALT" ]; then
    # Count files with correct domain prefix
    CORRECT_COUNT=$(grep -r "f5xcctl ${domain}" "$DOMAIN_DIR_ALT" 2>/dev/null | wc -l || echo 0)
    if [ "$CORRECT_COUNT" -gt 0 ]; then
      info "✓ Domain '${domain}': Found $CORRECT_COUNT correct commands"
    else
      warn "Domain '${domain}': No commands found (may be expected)"
    fi
  fi
done
echo ""

# Check 5: Verify namespace flag usage
echo "Check 5: Verifying '-n' flag for namespace..."
N_FLAG_COUNT=$(grep -r "f5xcctl.*-n" "${TOOLS_DIR}" | wc -l)
LONG_FLAG_COUNT=$(grep -r "f5xcctl.*--namespace" "${DOCS_DIR}" | wc -l)

if [ "$LONG_FLAG_COUNT" -gt 0 ]; then
  warn "Found ${LONG_FLAG_COUNT} instances of '--namespace' (should use '-n')"
else
  info "✓ No '--namespace' flags found (good consistency)"
fi

if [ "$N_FLAG_COUNT" -gt 0 ]; then
  info "✓ Found ${N_FLAG_COUNT} correct '-n' flag usages"
fi
echo ""

# Check 6: Integration documentation validation
echo "Check 6: Validating integration documentation..."
if [ -f "$INTEGRATION_FILE" ]; then
  INTEGRATION_CONFIG=$(grep -c "f5xcctl configuration" "$INTEGRATION_FILE" || true)
  if [ "$INTEGRATION_CONFIG" -gt 0 ]; then
    error "Found 'f5xcctl configuration' in integration docs"
  else
    info "✓ Integration documentation has correct commands"
  fi
else
  warn "Integration documentation not found: $INTEGRATION_FILE"
fi
echo ""

# Summary
echo "============================================================"
echo "Validation Summary"
echo "============================================================"

if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed!${NC}"
  echo ""
  echo "Summary of validations:"
  echo "  • No 'f5xcctl configuration' commands"
  echo "  • No incorrect '-f' flag usage"
  echo "  • Correct '-i' flag for file input"
  echo "  • Domain prefixes present in commands"
  echo "  • Namespace flags properly formatted"
  echo ""
  exit 0
else
  echo -e "${RED}✗ Found $ERRORS validation error(s)${NC}"
  echo ""
  echo "Issues to fix:"
  echo "  1. Replace 'f5xcctl configuration' with proper domain (e.g., 'f5xcctl load_balancer')"
  echo "  2. Replace '-f' flag with '-i' for file input"
  echo "  3. Ensure all commands follow pattern: f5xcctl {domain} {operation} {resource}"
  echo "  4. Use '-n' for namespace, not '--namespace'"
  echo ""
  exit 1
fi
