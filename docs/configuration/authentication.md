# Authentication

Configure authentication for the F5XC API MCP Server.

## Operating Modes

The server operates in two modes based on authentication status:

### Documentation Mode (Default)

**No credentials required.** The server provides:

- API documentation and schema information
- Parameter descriptions and validation
- f5xcctl command equivalents
- Terraform HCL examples
- Dependency and prerequisite guidance

This mode is ideal for users who:

- Authenticate via f5xcctl CLI
- Use Terraform with separate provider authentication
- Want to explore the API without credentials

### Execution Mode

**Requires valid credentials.** Adds:

- Direct API execution against your tenant
- Resource creation, reading, updating, deletion
- Real-time status queries
- Configuration deployment

## Authentication Methods

### API Token

The simplest authentication method. Get a token from the F5XC Console.

#### Getting an API Token

1. Log into F5 Distributed Cloud Console
2. Navigate to **Administration** → **Personal Management** → **Credentials**
3. Click **Add Credentials**
4. Select **API Token**
5. Set expiration and copy the token

#### Configuration

Set environment variables:

```bash
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
export F5XC_API_TOKEN="your-api-token-here"
```

Or in MCP configuration:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
        "F5XC_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

### P12 Certificate (mTLS)

More secure, certificate-based authentication.

#### Getting a P12 Certificate

1. Log into F5 Distributed Cloud Console
2. Navigate to **Administration** → **Personal Management** → **Credentials**
3. Click **Add Credentials**
4. Select **API Certificate**
5. Download the `.p12` file and note the password

#### Configuration

```bash
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
export F5XC_P12_FILE="/path/to/certificate.p12"
export F5XC_P12_PASSWORD="your-certificate-password"
```

Or in MCP configuration:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"],
      "env": {
        "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
        "F5XC_P12_FILE": "/absolute/path/to/certificate.p12",
        "F5XC_P12_PASSWORD": "your-certificate-password"
      }
    }
  }
}
```

!!! warning "Use Absolute Paths"
    The P12 file path must be absolute, not relative.

## URL Normalization

The server automatically normalizes various URL formats:

| You Enter | Normalized To |
|-----------|---------------|
| `https://tenant.volterra.us` | `https://tenant.console.ves.volterra.io/api` |
| `https://tenant.volterra.us/` | `https://tenant.console.ves.volterra.io/api` |
| `https://tenant.volterra.us/api` | `https://tenant.console.ves.volterra.io/api` |
| `https://tenant.console.ves.volterra.io` | `https://tenant.console.ves.volterra.io/api` |
| `https://tenant.staging.volterra.us` | `https://tenant.staging.console.ves.volterra.io/api` |

You can use any of these formats - the server handles the conversion.

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `F5XC_API_URL` | For auth | Tenant URL (auto-normalized) |
| `F5XC_API_TOKEN` | Token auth | API token from XC Console |
| `F5XC_P12_FILE` | Cert auth | Absolute path to P12 certificate |
| `F5XC_P12_PASSWORD` | Cert auth | Password for P12 certificate |
| `LOG_LEVEL` | No | Logging level (debug, info, warn, error) |

## Security Best Practices

### Never Commit Credentials

Add to `.gitignore`:

```gitignore
.env
*.p12
*.pem
```

### Use Environment Files

Create `.env` (not committed):

```bash
F5XC_API_URL=https://your-tenant.console.ves.volterra.io
F5XC_API_TOKEN=your-token
```

Reference in configuration:

```json
{
  "mcpServers": {
    "f5xc-api": {
      "command": "npx",
      "args": ["f5xc-api-mcp"],
      "envFile": "${workspaceFolder}/.env"
    }
  }
}
```

### Rotate Credentials Regularly

- API tokens: Rotate every 90 days
- Certificates: Use short-lived certificates when possible

### Least Privilege

Create service accounts with minimal required permissions for automation.

## Verifying Authentication

Check authentication status:

> "Get the F5XC API server info"

Response shows:

```json
{
  "mode": "execution",
  "authenticated": true,
  "authMethod": "token",
  "tenantUrl": "https://your-tenant.console.ves.volterra.io/api"
}
```

Or for unauthenticated:

```json
{
  "mode": "documentation",
  "authenticated": false,
  "authMethod": "none"
}
```

## Troubleshooting

### "Invalid API Token"

1. Check token hasn't expired
2. Verify token was copied completely (no truncation)
3. Ensure no extra whitespace

### "Certificate Error"

1. Verify P12 file path is absolute
2. Check password is correct
3. Ensure certificate hasn't expired

### "Connection Refused"

1. Check URL format
2. Verify network connectivity to F5XC
3. Check firewall rules

### "Unauthorized"

1. Verify credentials have required permissions
2. Check namespace access rights
3. Ensure tenant URL matches credential's tenant

## Next Steps

- [MCP Configuration Reference](mcp-json.md)
- [Environment Variables](environment-variables.md)
- [Tools Reference](../tools/index.md)
