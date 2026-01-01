# xcsh CLI Integration

The F5XC API MCP Server provides xcsh command equivalents for all operations.

## Overview

Every tool response includes the corresponding xcsh command, enabling you to:

- Execute commands directly in terminal
- Integrate with existing CI/CD pipelines
- Learn the CLI while using AI assistance
- Validate configurations before deployment

## Getting xcsh

### Installation

Download from the F5XC Console:

1. Log into F5 Distributed Cloud Console
2. Navigate to **Administration** → **Tools** → **CLI**
3. Download for your platform

=== "macOS"

    ```bash
    # Download binary
    curl -LO https://downloads.volterra.io/tools/xcsh/latest/xcsh_darwin_amd64
    chmod +x xcsh_darwin_amd64
    sudo mv xcsh_darwin_amd64 /usr/local/bin/xcsh
    ```

=== "Linux"

    ```bash
    # Download binary
    curl -LO https://downloads.volterra.io/tools/xcsh/latest/xcsh_linux_amd64
    chmod +x xcsh_linux_amd64
    sudo mv xcsh_linux_amd64 /usr/local/bin/xcsh
    ```

### Authentication

Configure xcsh with your credentials:

```bash
# API Token
export F5XC_API_TOKEN="your-api-token"
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io/api"

# Or P12 Certificate
export F5XC_P12_FILE="/path/to/certificate.p12"
export F5XC_P12_PASSWORD="your-password"
export F5XC_API_URL="https://your-tenant.console.ves.volterra.io/api"
```

## Command Mapping

### Tool to xcsh Mapping

| MCP Tool | xcsh Command |
|----------|--------------|
| `f5xc-api-load-balancer-http-loadbalancer-list` | `xcsh load_balancer list http_loadbalancer -n {namespace}` |
| `f5xc-api-load-balancer-http-loadbalancer-get` | `xcsh load_balancer get http_loadbalancer {name} -n {namespace}` |
| `f5xc-api-load-balancer-http-loadbalancer-create` | `xcsh load_balancer create http_loadbalancer -n {namespace} -i http_loadbalancer.yaml` |
| `f5xc-api-load-balancer-http-loadbalancer-delete` | `xcsh load_balancer delete http_loadbalancer {name} -n {namespace}` |

### Output Formats

```bash
# YAML output (default)
xcsh load_balancer get http_loadbalancer example-app -n production

# JSON output
xcsh load_balancer get http_loadbalancer example-app -n production --json

# List resources
xcsh load_balancer list http_loadbalancer -n production

# Terraform output
xcsh load_balancer get http_loadbalancer example-app -n production --terraform
```

## Workflow Examples

### AI-Assisted Configuration

1. Ask Claude to generate configuration:

   > "Create an HTTP load balancer for api.example.com"

2. Get the xcsh command from the response:

   ```bash
   xcsh load_balancer create http_loadbalancer -n production -i http_loadbalancer.yaml
   ```

3. Execute in terminal

### Validate Before Apply

Use `--dry-run` to validate:

```bash
xcsh load_balancer create http_loadbalancer -n production -i config.yaml --dry-run
```

### Export Existing Resources

```bash
# Export to file
xcsh load_balancer get http_loadbalancer example-app -n production > example-app.yaml

# Export multiple resources
xcsh load_balancer list http_loadbalancer -n production > all-lbs.yaml
```

### Compare Resources

```bash
# Get current resource and compare
xcsh load_balancer get http_loadbalancer example-app -n production > current.yaml
# Compare with local version: diff current.yaml config.yaml
```

## Common Commands

### List Resources

```bash
# All namespaces
xcsh tenant_management list namespace

# Resources in namespace
xcsh load_balancer list http_loadbalancer -n production
xcsh infrastructure list origin_pool -n production
xcsh security list app_firewall -n production
```

### Get Resource Details

```bash
# Get resource
xcsh load_balancer get http_loadbalancer example-app -n production

# Get resource with status
xcsh load_balancer status http_loadbalancer example-app -n production
```

### Apply Configuration

```bash
# Create/update from file
xcsh load_balancer apply http_loadbalancer -n production -i http-lb.yaml

# Create/update from stdin
xcsh load_balancer apply http_loadbalancer -n production -i - <<EOF
...
EOF

# Create/update individual resources
xcsh load_balancer apply http_loadbalancer -n production -i lb.yaml
xcsh infrastructure apply origin_pool -n production -i origin.yaml
xcsh security apply app_firewall -n production -i waf.yaml
```

### Delete Resources

```bash
# Single resource
xcsh load_balancer delete http_loadbalancer example-app -n production

# Delete multiple resources
xcsh load_balancer delete http_loadbalancer lb1 -n production
xcsh load_balancer delete http_loadbalancer lb2 -n production

# Force delete
xcsh load_balancer delete http_loadbalancer example-app -n production --force
```

## Tips

### Use AI for Complex Configurations

Ask Claude to help build complex configs, then execute with xcsh:

> "Generate xcsh config for a load balancer with WAF, rate limiting, and multiple origin pools"

### Shell Aliases

```bash
# Add to ~/.zshrc or ~/.bashrc
alias xc='xcsh'
alias xclb='xcsh load_balancer'
alias xcinfra='xcsh infrastructure'
alias xcsec='xcsh security'
```

### Pipe to jq

```bash
# Filter JSON output
xcsh load_balancer list http_loadbalancer -n production | jq '.items[].metadata.name'
```

### Check Resource Status

```bash
# Monitor status
xcsh load_balancer status http_loadbalancer example-app -n production
```

## Troubleshooting

### "Authentication failed"

```bash
# Check credentials
xcsh whoami

# Verify URL
echo $F5XC_API_URL
```

### "Resource not found"

```bash
# List all to verify name
xcsh load_balancer list http_loadbalancer -n production

# Check namespace
xcsh tenant_management list namespace | grep production
```

### "Validation error"

```bash
# Validate config
xcsh load_balancer create http_loadbalancer -n production -i config.yaml --dry-run

# Get schema
xcsh load_balancer list http_loadbalancer -n production
```

## Next Steps

- [Terraform Integration](terraform.md)
- [Tools Reference](../tools/index.md)
- [Authentication](../configuration/authentication.md)
