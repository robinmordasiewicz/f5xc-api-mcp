# F5XC-Auth Package Enhancement: URL Normalization

## Summary

Add URL normalization to the `@robinmordasiewicz/f5xc-auth` package's `CredentialManager`
to handle various user-provided URL formats automatically, creating a
**single source of truth** for URL handling.

## Problem Statement

Users configure F5XC API URLs in various formats:

- `https://tenant.console.ves.volterra.io` (standard)
- `https://tenant.console.ves.volterra.io/api` (with /api suffix)
- `tenant.console.ves.volterra.io` (no protocol)
- `tenant.console.ves.volterra.io/api` (no protocol, with /api)
- `https://tenant.staging.volterra.us` (staging environment)

When these non-standard formats are passed to the `httpClient` (which has `/api` in its
baseURL), it causes `/api/api` duplication resulting in 4xx errors.

Currently, consumers of `@robinmordasiewicz/f5xc-auth` must normalize URLs themselves
before or during `CredentialManager` initialization. This leads to:

- Duplicated normalization logic across consumers
- Inconsistent handling
- Easy-to-miss edge cases

## Proposed Solution

### Option 1: Normalize in CredentialManager.initialize()

Add URL normalization in the `CredentialManager.initialize()` method to automatically
normalize the `F5XC_API_URL` environment variable.

```typescript
// In CredentialManager class
async initialize(): Promise<void> {
  // Normalize API URL from environment if present
  const apiUrl = process.env.F5XC_API_URL;
  if (apiUrl) {
    process.env.F5XC_API_URL = this.normalizeUrl(apiUrl);
  }

  // ... existing initialization logic
}

private normalizeUrl(input: string): string {
  let url = input.trim();

  if (!url) return "";

  // Add https:// protocol if missing
  if (!url.match(/^https?:\/\//i)) {
    url = `https://${url}`;
  }

  // Remove trailing slashes
  url = url.replace(/\/+$/, "");

  // Remove /api suffix (httpClient adds it)
  url = url.replace(/\/api$/i, "");

  // Validate and reconstruct
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.hostname}${parsed.port ? `:${parsed.port}` : ""}`;
  } catch {
    return url;
  }
}
```

### Option 2: Normalize in Profile Creation/Loading

Normalize URLs when profiles are created or loaded:

```typescript
// In profile handling
async saveProfile(profile: Profile): Promise<void> {
  const normalizedProfile = {
    ...profile,
    apiUrl: this.normalizeUrl(profile.apiUrl)
  };
  // ... save logic
}

async loadProfile(name: string): Promise<Profile | null> {
  const profile = await this._loadProfile(name);
  if (profile) {
    profile.apiUrl = this.normalizeUrl(profile.apiUrl);
  }
  return profile;
}
```

### Option 3: Normalize in createHttpClient()

Normalize URLs when creating the HTTP client:

```typescript
export function createHttpClient(credentialManager: CredentialManager): AxiosInstance {
  const apiUrl = credentialManager.getApiUrl();
  const normalizedUrl = normalizeUrl(apiUrl);

  return axios.create({
    baseURL: `${normalizedUrl}/api`,
    // ... other config
  });
}
```

## Recommended Approach

**Option 1 (CredentialManager.initialize())** is recommended because:

1. Earliest possible normalization point
2. Single source of truth - all downstream code gets normalized URLs
3. No changes needed to profile storage format
4. Backward compatible

## URL Normalization Rules

| Input | Output |
|-------|--------|
| `tenant.console.ves.volterra.io` | `https://tenant.console.ves.volterra.io` |
| `tenant.console.ves.volterra.io/api` | `https://tenant.console.ves.volterra.io` |
| `https://tenant.console.ves.volterra.io/api` | `https://tenant.console.ves.volterra.io` |
| `https://tenant.console.ves.volterra.io/api/` | `https://tenant.console.ves.volterra.io` |
| `tenant.console.ves.volterra.io` | `https://tenant.console.ves.volterra.io` |
| `https://tenant.staging.volterra.us` | `https://tenant.staging.volterra.us` |
| `http://localhost:8080/api` | `http://localhost:8080` |

## Benefits

1. **Single Source of Truth**: All URL normalization happens in one place
2. **Consistent Behavior**: All consumers get normalized URLs automatically
3. **Backward Compatible**: Existing correctly-formatted URLs unchanged
4. **Error Prevention**: Eliminates `/api/api` duplication at the source
5. **Reduced Duplication**: Consumers don't need to implement normalization

## Implementation Notes

### Export the Utility

Consider exporting the normalization function for consumers who need it:

```typescript
export { normalizeUrl } from './utils/url-utils';
```

### Logging

Add optional logging when URLs are normalized:

```typescript
if (normalizedUrl !== apiUrl) {
  logger.info(`Normalized API URL: ${apiUrl} -> ${normalizedUrl}`);
}
```

### Testing

Add unit tests covering:

- Protocol addition (http/https)
- /api suffix stripping
- Trailing slash removal
- Whitespace trimming
- Various F5XC domain patterns
- Edge cases (empty string, malformed URLs)

## Migration Path

1. Add normalization to f5xc-auth package
2. Release new version (minor version bump)
3. Update f5xc-api-mcp to remove workaround normalization in server.ts
4. Update other consumers to remove their normalization code

## Current Workaround (f5xc-api-mcp)

Until this enhancement is implemented in f5xc-auth, the workaround is in `server.ts`:

```typescript
// src/server.ts
export async function createServer(): Promise<F5XCApiServer> {
  // Normalize F5XC_API_URL before CredentialManager reads it
  const apiUrl = process.env.F5XC_API_URL;
  if (apiUrl) {
    const normalizedUrl = normalizeF5XCUrl(apiUrl);
    if (normalizedUrl !== apiUrl) {
      logger.info(`Normalizing F5XC_API_URL: ${apiUrl} -> ${normalizedUrl}`);
      process.env.F5XC_API_URL = normalizedUrl;
    }
  }

  const credentialManager = new CredentialManager();
  await credentialManager.initialize();
  // ...
}
```

This workaround should be removed once f5xc-auth handles normalization internally.
