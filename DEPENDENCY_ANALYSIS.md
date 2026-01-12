# Dependency and Versioning Analysis

**Date**: 2026-01-12
**Project**: @robinmordasiewicz/f5xc-api-mcp
**Current Version**: 2.0.2
**Latest Published**: 2.0.21-2601122116

## Critical Issues Found

### 🔴 ISSUE-1: Self-Dependency in devDependencies

**Severity**: HIGH
**File**: `package.json` line 99
**Problem**: Package lists itself as a devDependency pointing to an outdated version

```json
"devDependencies": {
  "@robinmordasiewicz/f5xc-api-mcp": "^1.0.91-2601040443"
}
```

**Impact**:

- npm installs an old version of the package into node_modules/
- Creates confusion about which version is being used
- Wastes disk space and installation time
- No apparent use case found in codebase

**Evidence**:

```bash
npm list @robinmordasiewicz/f5xc-api-mcp
@robinmordasiewicz/f5xc-api-mcp@2.0.2 (current working directory)
└── @robinmordasiewicz/f5xc-api-mcp@1.0.91-2601040555 (installed from npm)
```

**Recommendation**: **REMOVE** - No code imports the package by name

- Checked: `tests/uat/documentation/installation-syntax.test.ts` - Only validates config, doesn't import
- Checked: `tests/unit/version.test.ts` - Imports from local src/, not package name
- No legitimate use case found

---

### 🟡 ISSUE-2: Version Mismatch

**Severity**: MEDIUM
**Files**: `package.json`, `specs/index.json`
**Problem**: Current package version doesn't match upstream API version

**Current State**:

- `package.json`: `2.0.2`
- `specs/index.json`: `2.0.21` (upstream)
- Latest published: `2.0.21-2601122116`

**Versioning System**:
According to `scripts/version.js`, versions should follow:

```text
{upstream_version}-{YYMMDDHHMM}
e.g., 2.0.21-2601122116
```

**Current Version Issues**:

- Missing timestamp component
- Missing upstream patch version (2.0.2 vs 2.0.21)
- Not following documented versioning scheme

**Recommendation**: Update version to match upstream using version script:

```bash
npm run version:update
```

---

### 🟢 ISSUE-3: Semver Test Expectation Mismatch

**Severity**: LOW
**File**: `tests/uat/documentation/installation-syntax.test.ts` line 181
**Problem**: Test expects pure semver format but actual versions use timestamp format

**Test Code**:

```typescript
it("should have valid semver format", () => {
  const pkg = getPackageJson();
  expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/);  // Expects: 2.0.2
});
```

**Reality**:

- Published versions: `2.0.21-2601122116` (includes timestamp)
- Test will fail with proper versioning

**Recommendation**: Update test regex to accept timestamp format:

```typescript
expect(pkg.version).toMatch(/^\d+\.\d+\.\d+(-\d+)?(-[A-Z]+)?$/);
```

---

## Dependency Structure Analysis

### Production Dependencies ✅

All production dependencies are properly configured:

| Dependency | Version | Status | Notes |
|------------|---------|--------|-------|
| @modelcontextprotocol/sdk | ^1.0.0 | ✅ Good | Core MCP functionality |
| @robinmordasiewicz/f5xc-auth | latest | ✅ Good | Auth library, uses latest |
| @types/node | ^25.0.0 | ✅ Good | Type definitions |
| axios | ^1.7.0 | ✅ Good | HTTP client |
| chalk | ^5.3.0 | ✅ Good | Terminal styling |
| https-proxy-agent | ^7.0.0 | ✅ Good | Proxy support |
| jszip | ^3.10.0 | ✅ Good | ZIP operations |
| yaml | ^2.4.0 | ✅ Good | YAML parsing |
| zod | ^4.0.0 | ✅ Good | Schema validation |

### Development Dependencies ❌

One problematic entry, others are fine:

| Dependency | Version | Status | Notes |
|------------|---------|--------|-------|
| @anthropic-ai/mcpb | ^2.1.0 | ✅ Good | MCP bundler |
| **@robinmordasiewicz/f5xc-api-mcp** | **^1.0.91-2601040443** | ❌ **REMOVE** | Self-dependency |
| @typescript-eslint/eslint-plugin | ^8.0.0 | ✅ Good | ESLint plugin |
| @typescript-eslint/parser | ^8.0.0 | ✅ Good | TypeScript parser |
| @vitest/coverage-v8 | ^4.0.16 | ✅ Good | Test coverage |
| eslint | ^9.0.0 | ✅ Good | Linting |
| eslint-config-prettier | ^10.0.0 | ✅ Good | Prettier config |
| globals | ^16.5.0 | ✅ Good | Global definitions |
| prettier | ^3.0.0 | ✅ Good | Code formatting |
| tsx | ^4.0.0 | ✅ Good | TypeScript execution |
| typescript | ^5.0.0 | ✅ Good | TypeScript compiler |
| vitest | ^4.0.16 | ✅ Good | Test framework |

### Overrides ✅

```json
"overrides": {
  "tmp": "^0.2.4"
}
```

**Status**: ✅ Good - Security fix for temporary file handling

---

## Versioning System Analysis

### How It Works

1. **Upstream Version Source**: `specs/index.json`

   ```json
   {
     "version": "2.0.21",
     "timestamp": "2026-01-08T05:43:21.022206+00:00"
   }
   ```

2. **Version Generation**: `scripts/version.js`
   - Reads upstream version from specs/index.json
   - Generates timestamp in YYMMDDHHMM format
   - Combines: `{upstream}-{timestamp}` or `{upstream}-{timestamp}-BETA`

3. **Version Commands**:
   - `npm run version:get` - Display current version
   - `npm run version:update` - Update package.json and manifest.json
   - `npm run version:upstream` - Show upstream version only

4. **Build Integration**:
   - `npm run generate:version` - Generates `src/version.ts` from package.json
   - Runs automatically via `prebuild` hook

### Version Lifecycle

```text
specs/index.json (upstream 2.0.21)
         ↓
scripts/version.js (generates 2.0.21-2601122116)
         ↓
npm run version:update
         ↓
package.json (version: 2.0.21-2601122116)
manifest.json (version: 2.0.21-2601122116)
         ↓
npm run generate:version (prebuild)
         ↓
src/version.ts (exports VERSION constant)
```

---

## Recommended Fixes

### Priority 1: Remove Self-Dependency ⚠️

```bash
# Remove the self-dependency
npm uninstall @robinmordasiewicz/f5xc-api-mcp

# Verify removal
npm list @robinmordasiewicz/f5xc-api-mcp --depth=0
```

**Expected Result**:

```text
@robinmordasiewicz/f5xc-api-mcp@2.0.2
(no nested dependency)
```

### Priority 2: Update Version to Match Upstream

```bash
# Update version using version script
npm run version:update

# This will update both package.json and manifest.json
# Expected new version: 2.0.21-{current-timestamp}
```

### Priority 3: Fix Test Expectations

Update `tests/uat/documentation/installation-syntax.test.ts` line 178-182:

**Before**:

```typescript
it("should have valid semver format", () => {
  const pkg = getPackageJson();
  expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/);
});
```

**After**:

```typescript
it("should have valid version format", () => {
  const pkg = getPackageJson();
  // Accept both simple semver (2.0.2) and timestamped versions (2.0.21-2601122116)
  expect(pkg.version).toMatch(/^\d+\.\d+\.\d+(-\d+)?(-[A-Z]+)?$/);
});
```

---

## Validation Checklist

After applying fixes:

- [ ] Self-dependency removed from package.json
- [ ] `npm list` shows no nested self-dependency
- [ ] Version updated to match upstream
- [ ] package.json and manifest.json versions match
- [ ] src/version.ts regenerated with correct version
- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Version script works: `npm run version:get`

---

## CI/CD Considerations

### Current CI Workflow

The project uses GitHub Actions for:

- Lint & Type Check
- Build validation
- Test execution
- Security scanning

### Version Management in CI

According to `.github/workflows/`, versions should be:

- Generated automatically during release
- Based on upstream specs version
- Include timestamp for build tracking

**Recommendation**: Ensure CI workflow uses `npm run version:update` before publishing

---

## Summary

**Total Issues**: 3

- 🔴 **Critical** (1): Self-dependency must be removed
- 🟡 **Medium** (1): Version should be updated to match upstream
- 🟢 **Low** (1): Test expectations should match versioning scheme

**Overall Dependency Health**: ✅ Good (except for self-dependency issue)

**Estimated Fix Time**: 5 minutes
**Risk Level**: Low (all fixes are straightforward)
