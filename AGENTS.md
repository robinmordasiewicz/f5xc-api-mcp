# OpenCode Agent Guidelines for f5xc-api-mcp

This document outlines best practices for GitHub operations to ensure proper
integration with the automation toolchain and avoid conflicts with CI/CD pipelines.

## Core Principles

1. **Never bypass branch protection** - Always use PRs for merging to protected branches
2. **Leverage automation workflows** - Let the CI/CD pipeline handle builds, tests, and releases
3. **Avoid manual overrides** - Commands like `--admin` flag bypass safety controls
4. **Follow the established automation chain** - Trust the toolchain over manual interventions

## GitHub Operations Best Practices

### Branch Management

| Do | Don't |
|-----|-------|
| Create feature branches for all changes | Push directly to main |
| Use descriptive branch names (`feat/`, `fix/`, `chore/`) | Create unnamed or generic branches |
| Delete branches after merge | Leave stale branches untracked |

### Pull Requests

| Do | Don't |
|-----|-------|
| Create PRs for all changes | Use `gh pr merge --admin` to bypass checks |
| Wait for CI checks to pass | Merge before validation completes |
| Use squash merge for sync PRs | Use `--merge` for large features |
| Delete branches after merge | Keep branches after merge |

## Automation Toolchain

The repository uses an automation toolchain with 5 workflows:

### 1. `openapi-sync.yml` - OpenAPI Spec Synchronization

| Component | Details |
|-----------|---------|
| **Schedule** | Every 6 hours (`0 */6 * * *`) |
| **Triggers** | Scheduled, `repository_dispatch` (from upstream), manual dispatch |
| **Upstream** | `robinmordasiewicz/f5xc-api-enriched` |

**Workflow Steps:**

1. Closes existing `openapi-sync/` PRs to prevent accumulation
2. Downloads enriched OpenAPI specs from upstream
3. Regenerates MCP tools from new specs
4. Regenerates test fixtures
5. Runs lint, typecheck, tests, and build
6. Creates PR with auto-merge enabled
7. Auto-merges after CI passes

**Branch Naming:** `openapi-sync/v{version}` (e.g., `openapi-sync/v2.0.21`)

**Labels:** `automated`, `openapi`, `dependencies`

### 2. `ci.yml` - Main CI Pipeline

| Job | Purpose | Dependencies |
|-----|---------|--------------|
| `verify-specs` | Sync specs and regenerate tools (fail if outdated) | - |
| `lint-and-typecheck` | ESLint, Prettier, TypeScript check | verify-specs |
| `test` | Unit tests with coverage | lint-and-typecheck |
| `build` | Compile TypeScript, validate MCPB manifest | lint-and-typecheck, test |
| `security-scan` | Trivy filesystem vulnerability scan | build |
| `docker-build` | Build and scan Docker image | build (main branch only) |

**Triggers:** Push/PR to `main` branch

**Node.js Version:** 24

### 3. `release.yml` - Release Pipeline

| Job | Purpose | Dependencies |
|-----|---------|--------------|
| `release` | Build, test, version bump, GitHub release, npm publish | - |
| `mcpb` | Create MCPB bundle for Claude Desktop | release |
| `docker` | Build and push multi-arch Docker images (amd64, arm64) | release |
| `notify` | Generate release summary | release, mcpb, docker |

**Triggers:** Push to `main` (ignores `docs/**`, `README.md`, `CONTRIBUTING.md`)

**Version Format:**

```text
v{upstream_api_version}-{YYMMDDHHMM}
Example: v2.0.21-2601080650
```

**Release Artifacts:**

- GitHub Release with release notes
- npm package (`@robinmordasiewicz/f5xc-api-mcp`)
- MCPB bundle (`.mcpb` file)
- Docker images (Docker Hub + GHCR)
- Multi-platform support (Linux amd64/arm64)

### 4. `docs.yml` - Documentation Pipeline

| Job | Purpose | Trigger |
|-----|---------|---------|
| `build` | Build MkDocs site with strict mode | Push/PR to `docs/**`, `mkdocs.yml` |
| `deploy` | Deploy to GitHub Pages | Push to `main` (docs files only) |
| `link-check` | Check internal links | Pull request (docs files only) |

**Python Version:** 3.12

**Deployment:** GitHub Pages via `actions/deploy-pages`

### 5. `security.yml` - Security Scanning

| Job | Purpose | Schedule |
|-----|---------|----------|
| `dependency-scan` | npm audit, Trivy filesystem scan | Push/PR, weekly |
| `container-scan` | Trivy container scan | Push to `main` |
| `secret-scan` | TruffleHog secret detection | Push/PR, weekly |
| `license-check` | License compliance check | Push/PR, weekly |
| `codeql` | CodeQL static analysis | Push/PR, weekly |
| `security-summary` | Aggregate results and fail on issues | After all scans |

**Scanners:**

- Trivy (filesystem + container)
- npm audit
- TruffleHog (secrets)
- license-checker
- GitHub CodeQL

## Proper Workflow Patterns

### Pattern 1: Feature Development

```bash
# 1. Create feature branch
git checkout -b feat/describe-feature

# 2. Make changes and commit
git add <files>
git commit -m "feat: description"

# 3. Push and create PR
git push -u origin feat/describe-feature
gh pr create --title "feat: description" --base main

# 4. Wait for CI checks
gh pr view <pr> --json state,statusCheckRollup

# 5. Merge (CI must pass first)
gh pr merge <pr> --admin --merge

# 6. Clean up branch
gh pr view <pr> --delete-branch
```

### Pattern 2: OpenAPI Spec Update

OpenAPI specs are **automatically** synced:

1. **Scheduled**: Every 6 hours
2. **Triggered**: When upstream repo releases new specs
3. **Manual**: `workflow_dispatch` with `force_regenerate` option

**No manual action required** - the `openapi-sync.yml` workflow handles everything:

- Closes old sync PRs
- Downloads new specs
- Regenerates tools
- Creates PR with auto-merge

### Pattern 3: Release

Releases are **automatic** on push to `main`:

1. CI pipeline runs on PR merge
2. Release workflow triggers on `main` push (non-docs files)
3. Version generated from upstream API version + timestamp
4. Artifacts published:
   - GitHub Release
   - npm package
   - MCPB bundle
   - Docker images (multi-arch)

**Manual release (if CI fails):**

```bash
# Create retry branch
git checkout -b chore/retry-release

# Make minimal change
git add README.md
git commit -m "chore: retry release"

# Push and create PR
git push -u origin chore/retry-release
gh pr create --title "chore: retry release" --base main

# Wait for CI, then merge
gh pr merge <pr> --admin --merge
```

## Prohibited Operations

```bash
# NEVER use --admin flag to bypass branch protection
gh pr merge --admin --merge <pr>

# NEVER push directly to protected branches
git push origin main

# NEVER create empty commits to "trigger" workflows
git commit --allow-empty -m "trigger"

# NEVER skip pre-commit hooks
git commit --no-verify
```

## Required Operations

```bash
# ALWAYS create feature branches
git checkout -b <type>/<description>
# Types: feat, fix, chore, docs, style, refactor, test, perf

# ALWAYS create PRs for main branch
gh pr create --title "<type>: description" --body "details"

# ALWAYS let CI pass before merging
gh pr merge <pr> --admin --merge  # Only after checks pass

# ALWAYS clean up branches after merge
gh pr view <pr> --delete-branch
```

## Workflow Triggers

| Event | Workflow | Result |
|-------|----------|--------|
| Upstream enriched-specs release | `openapi-sync.yml` | Auto sync PR created |
| Push/PR to `main` | `ci.yml` | Tests, lint, build, security scan |
| PR merged to `main` (non-docs) | `release.yml` | Release artifacts published |
| Push to `docs/**`, `mkdocs.yml` | `docs.yml` | GitHub Pages updated |
| Daily/Weekly | `security.yml` | Security scans run |
| Manual dispatch | Any workflow | On-demand run |

## Version Management

### Release Version Format

```text
v{upstream_api_version}-{YYMMDDHHMM}
Example: v2.0.21-2601080650
```

- **Upstream API version**: From `.specs/index.json` (synced from upstream)
- **Timestamp**: UTC-based for uniqueness (`YYMMDDHHMM`)
- Generated by `scripts/version.js`

### Version Sources

| Source | Description |
|--------|-------------|
| `npm run sync-specs` | Downloads upstream specs to `specs/` |
| `scripts/version.js upstream` | Extracts version from specs |
| `scripts/version.js` | Generates full release version |
| `scripts/version.js update` | Updates `package.json` version |

## Error Handling

### If Release Fails

1. Check the failed workflow run logs
2. Identify the root cause
3. Fix the issue in a feature branch
4. Create PR and merge to retry release

### Common Issues

| Issue | Solution |
|-------|----------|
| OpenAPI sync PR conflicts | Wait for auto-merge; old PRs auto-close |
| Docker build fails on macOS | CI uses Ubuntu; check Linux compatibility |
| npm publish fails | Verify `NPM_TOKEN` secret exists |
| Docker login fails | Verify `DOCKERHUB_TOKEN` secret exists |
| MCPB bundle fails | Check `manifest.json` validation |
| Trivy scan fails | Fix HIGH/CRITICAL vulnerabilities |

### Security Scan Failures

If `security.yml` fails:

1. **Dependency scan**: Run `npm audit` locally and fix issues
2. **Container scan**: Update base image or fix vulnerabilities
3. **Secret scan**: Rotate any leaked secrets immediately
4. **License check**: Add missing licenses to allowlist
5. **CodeQL**: Fix static analysis findings

## Quick Reference

### Essential Commands

```bash
# 1. Create feature branch
git checkout -b <type>/<description>

# 2. Make changes and commit
git add <files>
git commit -m "<type>: description"

# 3. Push and create PR
git push -u origin <branch>
gh pr create --title "<type>: description" --base main

# 4. Wait for CI checks (required status checks)
gh pr view <pr> --json state,statusCheckRollup

# 5. Merge (CI must pass first)
gh pr merge <pr> --admin --merge

# 6. Clean up (optional - auto-deletes if enabled)
gh pr view <pr> --delete-branch
```

### Development Commands

```bash
# Sync OpenAPI specs from upstream
npm run sync-specs

# Regenerate MCP tools
npm run generate

# Lint and format
npm run lint:fix
npm run format

# Type check
npm run typecheck

# Test
npm test
npm run test:coverage

# Build
npm run build

# Generate version info
node scripts/version.js
```

### Manual Workflow Dispatch

```bash
# Trigger OpenAPI sync manually
gh workflow run openapi-sync.yml -f force_regenerate=false

# Force regeneration even without changes
gh workflow run openapi-sync.yml -f force_regenerate=true
```

## Summary

> **Trust the automation toolchain.** The workflows are designed to handle spec
> syncing, releases, documentation, and security scanning automatically.

Following these guidelines ensures:

- No conflicts with automation
- Proper audit trail via PRs
- Consistent release versioning
- Validated code in main branch
- Automated security compliance

## Additional Resources

- **Repository**: <https://github.com/robinmordasiewicz/f5xc-api-mcp>
- **Documentation**: <https://robinmordasiewicz.github.io/f5xc-api-mcp>
- **npm Package**: <https://www.npmjs.com/package/@robinmordasiewicz/f5xc-api-mcp>
- **Upstream Specs**: <https://github.com/robinmordasiewicz/f5xc-api-enriched>
