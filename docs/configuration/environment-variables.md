# Environment Variables

Complete reference for F5XC API MCP Server environment variables.

!!! tip "Quick Setup"
    For step-by-step authentication setup, see the [Authentication Guide](authentication.md).

## Variable Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `F5XC_API_URL` | For auth | Tenant URL (auto-normalized) |
| `F5XC_API_TOKEN` | Token auth | API token from XC Console |
| `F5XC_P12_FILE` | Cert auth | Absolute path to P12 certificate |
| `F5XC_P12_PASSWORD` | Cert auth | Password for P12 certificate |
| `F5XC_PROFILE` | No | Profile name from `~/.f5xc/credentials.json` |
| `LOG_LEVEL` | No | Logging level: debug, info, warn, error |
| `NODE_ENV` | No | Node environment: development, production |

---

## Authentication Variables

### F5XC_API_URL

The F5 Distributed Cloud tenant URL. Multiple formats accepted (auto-normalized).

```bash
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
```

!!! info "URL Normalization"
    See [Authentication Guide](authentication.md#url-normalization) for accepted URL formats.

### F5XC_API_TOKEN

API token from F5XC Console. Required for token-based authentication.

```bash
export F5XC_API_TOKEN="your-api-token"
```

!!! warning "Security"
    Never commit API tokens to version control.

### F5XC_P12_FILE

Absolute path to P12 certificate file. Required for certificate-based authentication.

```bash
export F5XC_P12_FILE="/path/to/certificate.p12"
```

!!! note "Absolute Paths Required"
    Must be an absolute path, not relative.

### F5XC_P12_PASSWORD

Password for the P12 certificate.

```bash
export F5XC_P12_PASSWORD="certificate-password"
```

### F5XC_PROFILE

Select a profile from `~/.f5xc/credentials.json` for multi-tenant credential management.

```bash
export F5XC_PROFILE="staging"
```

!!! note "Profile-Based Configuration"
    Profiles are optional. For setup, run: `f5xc-api-mcp --setup`

    See [Authentication Guide](authentication.md#profile-based-configuration) for details.

---

## Configuration Variables

### LOG_LEVEL

Controls logging verbosity. Logs go to stderr to avoid interfering with MCP protocol.

```bash
export LOG_LEVEL="info"
```

| Level | Description |
|-------|-------------|
| `debug` | Verbose debugging information |
| `info` | General operational information (default) |
| `warn` | Warning messages |
| `error` | Error messages only |

### NODE_ENV

Node.js environment setting.

```bash
export NODE_ENV="production"
```

| Value | Behavior |
|-------|----------|
| `development` | Additional debug output |
| `production` | Optimized for production (default) |

---

## Setting Variables

### Shell (Temporary)

```bash
export F5XC_API_URL="https://tenant.console.ves.volterra.io"
export F5XC_API_TOKEN="your-token"
npx f5xc-api-mcp
```

### Shell Profile (Persistent)

Add to `~/.zshrc`, `~/.bashrc`, or equivalent:

```bash
export F5XC_API_URL="https://tenant.console.ves.volterra.io"
export F5XC_API_TOKEN="your-token"
```

### .env File

Create `.env` in your project:

```bash
F5XC_API_URL=https://tenant.console.ves.volterra.io
F5XC_API_TOKEN=your-token
LOG_LEVEL=info
```

!!! danger "Security"
    Add `.env` to `.gitignore` to prevent committing credentials.

### MCP Configuration

Set in `env` block:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "https://tenant.console.ves.volterra.io",
        "F5XC_API_TOKEN": "your-token"
      }
    }
  }
}
```

### Docker

Pass with `-e` flags:

```bash
docker run -it \
  -e F5XC_API_URL="https://tenant.console.ves.volterra.io" \
  -e F5XC_API_TOKEN="your-token" \
  ghcr.io/robinmordasiewicz/f5xc-api-mcp
```

Or with env file:

```bash
docker run -it --env-file .env ghcr.io/robinmordasiewicz/f5xc-api-mcp
```

---

## Authentication Priority

When multiple authentication sources are configured:

1. **Environment Variables** (highest priority) - `F5XC_API_URL`, `F5XC_API_TOKEN`, etc.
   - Environment variables override all other sources
2. **Profile-Based Configuration** - `F5XC_PROFILE` selection from `~/.f5xc/credentials.json`
   - Selected by `F5XC_PROFILE` env var or default profile
   - Supports multiple credentials for different tenants
3. **No Authentication** (lowest priority) - Documentation mode
   - Returns API documentation without executing operations

!!! tip "Profile Setup"
    Set up profiles with auto-detection of existing environment variables:
    ```bash
    f5xc-api-mcp --setup
    ```

---

## Validation

### Check Settings

```bash
env | grep F5XC
```

### Verify in Server

Ask Claude:

> "Get the F5XC API server info"

Check for `authenticated: true` and correct `authMethod`.

---

## Next Steps

- [Authentication Guide](authentication.md) - Detailed authentication setup and profile configuration
- [Security Best Practices](../security.md) - Credential storage and management
- [MCP Configuration](mcp-json.md) - Full MCP config reference
- [Troubleshooting](../troubleshooting/faq.md) - Common issues
