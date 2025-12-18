# Troubleshooting FAQ

Common issues and solutions for the F5XC API MCP Server.

## Installation Issues

### "npx: command not found"

Node.js is not installed or not in PATH.

**Solution:**

```bash
# Install Node.js
# macOS
brew install node

# Check version
node --version  # Should be 18+
npx --version
```

### "Package not found"

npx cache might be stale.

**Solution:**

```bash
# Clear cache
npx clear-npx-cache

# Try with force flag
npx -y f5xc-api-mcp
```

### Docker "image not found"

**Solution:**

```bash
# Pull latest image
docker pull ghcr.io/robinmordasiewicz/f5xc-api-mcp:latest

# Or use Docker Hub
docker pull robinmordasiewicz/f5xc-api-mcp:latest
```

## Configuration Issues

### "MCP server not loading"

Claude Desktop or other clients can't connect to the server.

**Solutions:**

1. Validate JSON configuration:

   ```bash
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .
   ```

2. Check file location matches your OS
3. Restart the application completely
4. Check for syntax errors (trailing commas, missing quotes)

### "Environment variables not set"

**Solutions:**

1. For MCP config, use `env` block:

   ```json
   {
     "env": {
       "F5XC_API_URL": "https://..."
     }
   }
   ```

2. For shell, export variables:

   ```bash
   export F5XC_API_URL="https://..."
   ```

3. Verify variables are set:

   ```bash
   echo $F5XC_API_URL
   ```

## Authentication Issues

### "Authentication failed"

API token or certificate is invalid.

**Solutions:**

1. **Token expired**: Generate new token in F5XC Console
2. **Wrong URL**: Check URL format:

   ```text
   https://your-tenant.console.ves.volterra.io
   ```

3. **Test credentials**:

   ```bash
   curl -H "Authorization: APIToken $F5XC_API_TOKEN" \
     "$F5XC_API_URL/web/namespaces"
   ```

### "Certificate error"

P12 certificate issues.

**Solutions:**

1. **Use absolute path**:

   ```bash
   F5XC_P12_FILE="/Users/username/certs/f5xc.p12"  # Correct
   F5XC_P12_FILE="./f5xc.p12"  # Wrong
   ```

2. **Check password**: Verify password is correct
3. **Check expiration**: Certificates expire - regenerate if needed

### "Unauthorized"

Credentials valid but insufficient permissions.

**Solutions:**

1. Check namespace access rights
2. Verify service account permissions
3. Contact F5XC administrator

## Tool Execution Issues

### "Tool not found"

MCP client can't find F5XC tools.

**Solutions:**

1. Verify server is running:

   ```bash
   npx f5xc-api-mcp
   ```

2. Check tool name spelling
3. Restart AI assistant

### "Validation error"

Input parameters don't match schema.

**Solutions:**

1. Check required parameters
2. Verify data types (string vs number)
3. Use documentation mode to see schema:
   > "Show the schema for f5xc-api-waap-http-loadbalancer-create"

### "API error: 400 Bad Request"

Invalid API request.

**Solutions:**

1. Check resource name format (alphanumeric, hyphens)
2. Verify namespace exists
3. Check for missing required fields

### "API error: 404 Not Found"

Resource doesn't exist.

**Solutions:**

1. Verify resource name and namespace
2. List resources to confirm:
   > "List all HTTP load balancers in production namespace"

### "API error: 409 Conflict"

Resource already exists or conflicting state.

**Solutions:**

1. Check if resource already exists
2. Wait for pending operations to complete
3. Use update instead of create

## Performance Issues

### "Slow responses"

**Solutions:**

1. Check network connectivity to F5XC
2. Reduce request scope (filter by namespace)
3. Use specific get vs list operations

### "Timeout errors"

**Solutions:**

1. Check F5XC service status
2. Verify network allows outbound HTTPS
3. Try simpler operations first

## Documentation Mode Issues

### "Only getting documentation, not executing"

Server is in documentation mode (no credentials).

**Solution:**

Set authentication environment variables:

```json
{
  "env": {
    "F5XC_API_URL": "https://your-tenant.console.ves.volterra.io",
    "F5XC_API_TOKEN": "your-token"
  }
}
```

### "Want documentation but getting execution"

**Solution:**

Remove credentials to use documentation-only mode. This is useful when you authenticate separately via f5xcctl or Terraform.

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `ECONNREFUSED` | Can't connect to F5XC | Check network/URL |
| `ENOTFOUND` | DNS resolution failed | Verify URL hostname |
| `ETIMEDOUT` | Connection timed out | Check firewall rules |
| `401 Unauthorized` | Invalid credentials | Refresh token/cert |
| `403 Forbidden` | Insufficient permissions | Check RBAC settings |
| `429 Too Many Requests` | Rate limited | Wait and retry |
| `500 Internal Server Error` | F5XC service issue | Check F5XC status |

## Getting Help

### Logs

Enable debug logging:

```json
{
  "env": {
    "LOG_LEVEL": "debug"
  }
}
```

Logs go to stderr (visible in terminal or application logs).

### Reporting Issues

1. Check existing issues: [GitHub Issues](https://github.com/robinmordasiewicz/f5xc-api-mcp/issues)
2. Include:
   - Error message
   - Configuration (redact credentials)
   - Steps to reproduce
   - Node.js version: `node --version`
   - OS and version

### Support Channels

- GitHub Issues: Bug reports and feature requests
- F5XC Documentation: [docs.cloud.f5.com](https://docs.cloud.f5.com)
- F5 Support: For F5XC platform issues
