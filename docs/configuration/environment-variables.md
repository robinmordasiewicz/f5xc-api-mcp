# Environment Variables

Complete reference for F5XC API MCP Server environment variables.

## Authentication Variables

### F5XC_API_URL

**Required for authentication**

The F5 Distributed Cloud tenant URL.

```bash
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io"
```

Accepted formats (auto-normalized):

- `https://tenant.volterra.us`
- `https://tenant.console.ves.volterra.io`
- `https://tenant.staging.volterra.us`

### F5XC_API_TOKEN

**Required for API token authentication**

API token from F5XC Console.

```bash
export F5XC_API_TOKEN="your-api-token"
```

!!! warning "Security"
    Never commit API tokens to version control.

### F5XC_P12_FILE

**Required for certificate authentication**

Absolute path to P12 certificate file.

```bash
export F5XC_P12_FILE="/path/to/certificate.p12"
```

!!! note
    Must be an absolute path, not relative.

### F5XC_P12_PASSWORD

**Required for certificate authentication**

Password for the P12 certificate.

```bash
export F5XC_P12_PASSWORD="certificate-password"
```

## Configuration Variables

### LOG_LEVEL

Controls logging verbosity. Logs go to stderr (not stdout) to avoid interfering with MCP protocol.

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

## Setting Environment Variables

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

Then reload:

```bash
source ~/.zshrc
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

## Authentication Priority

When multiple authentication methods are configured, the server uses this priority:

1. **API Token** (`F5XC_API_TOKEN`) - Highest priority
2. **P12 Certificate** (`F5XC_P12_FILE` + `F5XC_P12_PASSWORD`)
3. **No Authentication** - Documentation mode

## Validation

### Check Current Settings

```bash
# Show relevant environment variables
env | grep F5XC
```

### Test Authentication

```bash
# Test with curl (API token)
curl -H "Authorization: APIToken $F5XC_API_TOKEN" \
  "$F5XC_API_URL/web/namespaces"

# Test with curl (shows if URL is reachable)
curl -I "$F5XC_API_URL"
```

### Verify in MCP Server

Ask Claude:

> "Get the F5XC API server info"

Check the response for `authenticated: true` and correct `authMethod`.

## Security Best Practices

### Use Secret Managers

For production, use secret managers:

```bash
# AWS Secrets Manager
export F5XC_API_TOKEN=$(aws secretsmanager get-secret-value \
  --secret-id f5xc-api-token --query SecretString --output text)

# HashiCorp Vault
export F5XC_API_TOKEN=$(vault kv get -field=token secret/f5xc)
```

### Rotate Credentials

- Set calendar reminders to rotate tokens before expiration
- Use short-lived certificates when possible
- Audit credential usage regularly

### Minimal Permissions

Create service accounts with only required permissions:

- Read-only for documentation queries
- Namespace-specific for limited deployments
- Full access only when necessary

## Troubleshooting

### Variable Not Set

```bash
# Check if set
echo $F5XC_API_URL

# Check if exported
export | grep F5XC
```

### Wrong Value

```bash
# Debug: print variables (careful with tokens!)
echo "URL: $F5XC_API_URL"
echo "Token length: ${#F5XC_API_TOKEN}"
```

### Docker Not Seeing Variables

Ensure variables are explicitly passed:

```bash
# This works
docker run -e F5XC_API_URL -e F5XC_API_TOKEN ...

# This requires variables to be set in current shell
docker run -e F5XC_API_URL="$F5XC_API_URL" ...
```

## Next Steps

- [Authentication Guide](authentication.md)
- [MCP Configuration](mcp-json.md)
- [Troubleshooting](../troubleshooting/faq.md)
