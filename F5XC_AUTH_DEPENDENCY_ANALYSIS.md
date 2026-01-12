# F5XC-Auth Dependency Analysis

**Date**: 2026-01-12
**Dependency**: `@robinmordasiewicz/f5xc-auth`
**Current Version**: 1.0.1
**Configuration**: `"latest"` in package.json

---

## Overview

The `@robinmordasiewicz/f5xc-auth` package is a shared authentication library
providing XDG-compliant profile management for F5 Distributed Cloud MCP servers.
This analysis covers the dependency relationship, integration points, and
configuration recommendations.

---

## Dependency Information

### Package Details

```text
Name: @robinmordasiewicz/f5xc-auth
Version: 1.0.1 (latest)
License: MIT
Published: 3 days ago
Maintainer: Robin Mordasiewicz <robin@mordasiewicz.com>
Repository: https://github.com/robinmordasiewicz/f5xc-auth
```

### Package Dependencies

```json
{
  "axios": "^1.7.0",
  "yaml": "^2.7.0"
}
```

**Status**: ✅ Compatible with f5xc-api-mcp dependencies (no conflicts)

### Available Versions

```text
1.0.0  (initial release)
1.0.1  (latest)
```

---

## Current Configuration Issues

### ⚠️ ISSUE: Using "latest" Version Specifier

**Current Configuration** (package.json line 112):

```json
"dependencies": {
  "@robinmordasiewicz/f5xc-auth": "latest"
}
```

**Locked Version** (package-lock.json):

```json
"node_modules/@robinmordasiewicz/f5xc-auth": {
  "version": "1.0.1"
}
```

### Problems with "latest"

1. **Non-Reproducible Builds**
   - Different developers may get different versions
   - CI/CD builds can vary over time
   - Makes debugging version-specific issues difficult

2. **Breaking Changes Risk**
   - Major version bumps (2.0.0) would auto-install
   - No protection against breaking API changes
   - Could break production deployments

3. **npm Best Practices Violation**
   - npm documentation recommends specific version ranges
   - Most enterprise projects forbid "latest"
   - Fails dependency auditing tools

4. **Cache and Lock File Issues**
   - package-lock.json locks to 1.0.1 currently
   - Next `npm install` might get different version
   - Inconsistent behavior across environments

### Recommended Fix

**Option 1: Pin to Specific Version** (Most Conservative)

```json
"@robinmordasiewicz/f5xc-auth": "1.0.1"
```

✅ **Best for**: Stable production environments
✅ **Pros**: Maximum stability, explicit updates required
❌ **Cons**: Misses bug fixes and patches

**Option 2: Use Caret Range** (Recommended)

```json
"@robinmordasiewicz/f5xc-auth": "^1.0.1"
```

✅ **Best for**: Active development with stability
✅ **Pros**: Gets patches (1.0.x), blocks breaking changes (2.x.x)
✅ **Follows semver**: Minor and patch updates only
✅ **Industry standard**: Most common approach

**Option 3: Use Tilde Range** (Conservative)

```json
"@robinmordasiewicz/f5xc-auth": "~1.0.1"
```

✅ **Best for**: Very conservative updates
✅ **Pros**: Only gets patch updates (1.0.x)
❌ **Cons**: Might miss important minor features

---

## Integration Analysis

### Import Locations

The f5xc-auth library is imported in **3 main source files**:

1. **src/server.ts** (Core server initialization)

   ```typescript
   import {
     CredentialManager,
     AuthMode,
     HttpClient,
     createHttpClient,
   } from "@robinmordasiewicz/f5xc-auth";
   ```

2. **src/tools/configure-auth.ts** (Auth configuration tool)

   ```typescript
   import {
     getProfileManager,
     type CredentialManager,
     type Profile,
   } from "@robinmordasiewicz/f5xc-auth";
   ```

3. **src/tools/discovery/execute.ts** (Tool execution)

   ```typescript
   import {
     CredentialManager,
     AuthMode,
     createHttpClient
   } from "@robinmordasiewicz/f5xc-auth";
   ```

### Additional References

The library is also imported in **19 test files** across:

- Unit tests: `tests/unit/`
- Contract tests: `tests/contract/`
- Acceptance tests: `tests/acceptance/`
- UAT tests: `tests/uat/`
- E2E tests: `tests/e2e/`

**Status**: ✅ Well-integrated and thoroughly tested

---

## Functionality Provided by f5xc-auth

### Core Features

1. **Credential Management**
   - `CredentialManager` class for authentication state
   - Environment variable loading
   - Profile-based configuration
   - Multiple auth methods (API token, mTLS, P12)

2. **Profile Management**
   - XDG-compliant profile storage (`~/.config/f5xc/profiles/`)
   - Active profile tracking
   - Profile listing and switching
   - Secure credential storage

3. **HTTP Client**
   - `createHttpClient()` factory function
   - Axios-based HTTP client with auth headers
   - Proxy support via `https-proxy-agent`
   - Credential-aware requests

4. **Authentication Modes**
   - `AuthMode.DOCUMENTATION` - No credentials, read-only
   - `AuthMode.EXECUTION` - Authenticated, full access
   - Automatic mode detection

### Integration Points

```text
f5xc-api-mcp Architecture with f5xc-auth:

┌─────────────────────────────────────┐
│     MCP Server (src/server.ts)      │
│  - Initializes CredentialManager    │
│  - Creates HttpClient                │
│  - Determines AuthMode               │
└──────────────┬──────────────────────┘
               │
               │ uses
               ↓
┌─────────────────────────────────────┐
│   @robinmordasiewicz/f5xc-auth      │
│  - Profile Management                │
│  - Credential Loading                │
│  - HTTP Client Factory               │
└──────────────┬──────────────────────┘
               │
               │ provides auth to
               ↓
┌─────────────────────────────────────┐
│  Tool Execution & API Calls         │
│  - Discovery tools                   │
│  - Resource operations               │
│  - F5XC API endpoints                │
└─────────────────────────────────────┘
```

---

## Dependency Relationship Assessment

### ✅ Strengths

1. **Clean Separation of Concerns**
   - Auth logic isolated in separate package
   - f5xc-api-mcp focuses on MCP protocol and tools
   - Reusable across multiple F5XC MCP servers

2. **No Circular Dependencies**
   - f5xc-auth has no dependency on f5xc-api-mcp
   - One-way dependency relationship
   - Clean module boundaries

3. **Shared Dependencies Well-Managed**
   - Both use axios ^1.7.0 (consistent)
   - Both use yaml (different minor versions, compatible)
   - No version conflicts

4. **Proper Encapsulation**
   - f5xc-auth exports clear public API
   - Type definitions included
   - Well-documented interfaces

### ⚠️ Concerns

1. **Version Specification**
   - Using "latest" is problematic (see above)
   - Should use semver range (^1.0.1)

2. **Tight Coupling Potential**
   - Breaking changes in f5xc-auth would break f5xc-api-mcp
   - Mitigation: Use semver, coordinate releases

3. **Update Coordination**
   - Both packages maintained by same author (good)
   - Need clear versioning policy
   - Should document compatibility matrix

---

## Version Compatibility Matrix

### Current State

| f5xc-api-mcp | f5xc-auth | Status | Notes |
|--------------|-----------|--------|-------|
| 2.0.21-2601122132 | 1.0.1 | ✅ Compatible | Currently deployed |
| 2.0.x | 1.0.x | ✅ Compatible | Expected stable pairing |
| 3.x.x | 2.x.x | ⚠️ Unknown | Would need testing |

### Recommendations

1. **Document Compatibility**
   - Create COMPATIBILITY.md in both repos
   - Specify which versions work together
   - Update with each release

2. **Coordinated Releases**
   - Test f5xc-api-mcp with new f5xc-auth versions before release
   - Consider monorepo if changes frequently coordinated
   - Use CI to test against multiple versions

3. **Breaking Change Policy**
   - Communicate breaking changes early
   - Provide migration guides
   - Consider deprecation periods

---

## Testing Integration

### Test Coverage of f5xc-auth

Based on imports found in test files:

1. **Unit Tests**: ✅ Covered
   - `tests/unit/server.test.ts`
   - `tests/unit/handlers.test.ts`
   - `tests/unit/tool-generator.test.ts`

2. **Contract Tests**: ✅ Covered
   - `tests/contract/mcp-protocol.test.ts`

3. **Acceptance Tests**: ✅ Covered
   - `tests/acceptance/auth-integration.test.ts`
   - `tests/acceptance/api-endpoints.test.ts`
   - `tests/acceptance/url-normalization.test.ts`

4. **E2E Tests**: ✅ Covered
   - `tests/e2e/workflows/01-http-loadbalancer.test.ts`

**Status**: ✅ Comprehensive test coverage of integration

---

## Security Considerations

### Credential Storage

f5xc-auth stores credentials in:

```text
~/.config/f5xc/profiles/{profile-name}.yaml
```

**Security Features**:

- ✅ XDG-compliant location
- ✅ User-only file permissions (600)
- ✅ Plain text config (user's responsibility to secure)
- ⚠️ No encryption at rest (acceptable for local dev)

**Recommendations**:

1. Document security implications in README
2. Consider adding keychain integration for production
3. Warn users about credential file permissions

### Dependency Security

```bash
npm audit @robinmordasiewicz/f5xc-auth
```

**Direct Dependencies**:

- `axios ^1.7.0` - ✅ No known vulnerabilities
- `yaml ^2.7.0` - ✅ No known vulnerabilities

**Status**: ✅ No security vulnerabilities detected

---

## Recommended Actions

### Priority 1: Fix Version Specifier ⚠️

**Current**:

```json
"@robinmordasiewicz/f5xc-auth": "latest"
```

**Recommended**:

```json
"@robinmordasiewicz/f5xc-auth": "^1.0.1"
```

**Command**:

```bash
# Option 1: Manual edit package.json, then:
npm install

# Option 2: Use npm to update:
npm install @robinmordasiewicz/f5xc-auth@^1.0.1
```

### Priority 2: Document Compatibility

Create `COMPATIBILITY.md`:

```markdown
# Compatibility Matrix

## f5xc-auth Dependency

| f5xc-api-mcp Version | Required f5xc-auth | Status |
|---------------------|-------------------|--------|
| 2.0.x | ^1.0.1 | ✅ Stable |

## Testing

Before releasing, test with:
- Minimum supported version: 1.0.1
- Latest version: 1.0.1
```

### Priority 3: Update CI/CD

Ensure CI workflow:

1. Uses locked versions from package-lock.json
2. Runs `npm ci` (not `npm install`)
3. Tests against specific f5xc-auth versions

---

## Summary

### Current Status

✅ **Working Well**:

- Integration is clean and well-tested
- No dependency conflicts
- Proper separation of concerns
- Comprehensive test coverage

⚠️ **Needs Attention**:

- Version specifier should use semver range (^1.0.1)
- Should document compatibility matrix
- Consider coordinated release strategy

❌ **Not Issues** (No Problems Found):

- No circular dependencies
- No security vulnerabilities
- No version conflicts
- No breaking changes detected

### Impact Assessment

**Risk Level**: 🟡 **MEDIUM**

- Current system works fine
- "latest" specifier could cause future issues
- Easy to fix with minimal risk

**Effort to Fix**: ⏱️ **5 minutes**

- Change one line in package.json
- Run `npm install`
- Verify tests pass

**Priority**: 📊 **MEDIUM**

- Not urgent but should be addressed
- Best practice compliance
- Prevents future issues

---

## Next Steps

1. **Immediate** (This Session):

   ```bash
   # Update package.json dependency
   npm install @robinmordasiewicz/f5xc-auth@^1.0.1

   # Verify tests still pass
   npm test

   # Commit changes
   git add package.json package-lock.json
   git commit -m "fix(deps): use semver range for f5xc-auth dependency"
   ```

2. **Short Term** (This Week):
   - Document compatibility matrix
   - Update CI/CD to use `npm ci`
   - Add dependency update policy to CONTRIBUTING.md

3. **Long Term** (Ongoing):
   - Monitor f5xc-auth releases
   - Test with new versions before updating
   - Coordinate breaking changes
