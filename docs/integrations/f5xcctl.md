# f5xcctl CLI Integration

The F5XC API MCP Server provides f5xcctl command equivalents for all operations.

## Overview

Every tool response includes the corresponding f5xcctl command, enabling you to:

- Execute commands directly in terminal
- Integrate with existing CI/CD pipelines
- Learn the CLI while using AI assistance
- Validate configurations before deployment

## Getting f5xcctl

### Installation

Download from the F5XC Console:

1. Log into F5 Distributed Cloud Console
2. Navigate to **Administration** → **Tools** → **CLI**
3. Download for your platform

Or install via package manager:

=== "macOS"

    ```bash
    brew install f5xcctl
    ```

=== "Linux"

    ```bash
    # Download binary
    curl -LO https://downloads.volterra.io/tools/f5xcctl/latest/f5xcctl_linux_amd64
    chmod +x f5xcctl_linux_amd64
    sudo mv f5xcctl_linux_amd64 /usr/local/bin/f5xcctl
    ```

### Authentication

Configure f5xcctl with your credentials:

```bash
# API Token
export VES_P12_PASSWORD=""
export VOLT_API_TOKEN="your-api-token"
export VOLT_API_URL="https://your-tenant.console.ves.volterra.io/api"

# Or P12 Certificate
export VES_P12_PASSWORD="your-password"
export VOLTERRA_P12_BUNDLE="/path/to/certificate.p12"
export VOLT_API_URL="https://your-tenant.console.ves.volterra.io/api"
```

## Command Mapping

### Tool to f5xcctl Mapping

| MCP Tool | f5xcctl Command |
|----------|-----------------|
| `f5xc-api-load-balancer-http-loadbalancer-list` | `f5xcctl load_balancer list http_loadbalancer -n {namespace}` |
| `f5xc-api-load-balancer-http-loadbalancer-get` | `f5xcctl load_balancer get http_loadbalancer {name} -n {namespace}` |
| `f5xc-api-load-balancer-http-loadbalancer-create` | `f5xcctl load_balancer create http_loadbalancer -n {namespace} -i http_loadbalancer.yaml` |
| `f5xc-api-load-balancer-http-loadbalancer-delete` | `f5xcctl load_balancer delete http_loadbalancer {name} -n {namespace}` |

### Output Formats

```bash
# YAML output (default)
f5xcctl load_balancer get http_loadbalancer example-app -n production

# JSON output
f5xcctl load_balancer get http_loadbalancer example-app -n production --json

# List resources
f5xcctl load_balancer list http_loadbalancer -n production

# Terraform output
f5xcctl load_balancer get http_loadbalancer example-app -n production --terraform
```

## Workflow Examples

### AI-Assisted Configuration

1. Ask Claude to generate configuration:

   > "Create an HTTP load balancer for api.example.com"

2. Get the f5xcctl command from the response:

   ```bash
   f5xcctl load_balancer create http_loadbalancer -n production -i http_loadbalancer.yaml
   ```

3. Execute in terminal

### Validate Before Apply

Use `--dry-run` to validate:

```bash
f5xcctl load_balancer create http_loadbalancer -n production -i config.yaml --dry-run
```

### Export Existing Resources

```bash
# Export to file
f5xcctl load_balancer get http_loadbalancer example-app -n production > example-app.yaml

# Export multiple resources
f5xcctl load_balancer list http_loadbalancer -n production > all-lbs.yaml
```

### Compare Resources

```bash
# Get current resource and compare
f5xcctl load_balancer get http_loadbalancer example-app -n production > current.yaml
# Compare with local version: diff current.yaml config.yaml
```

## Common Commands

### List Resources

```bash
# All namespaces
f5xcctl tenant_management list namespace

# Resources in namespace
f5xcctl load_balancer list http_loadbalancer -n production
f5xcctl infrastructure list origin_pool -n production
f5xcctl security list app_firewall -n production
```

### Get Resource Details

```bash
# Get resource
f5xcctl load_balancer get http_loadbalancer example-app -n production

# Get resource with status
f5xcctl load_balancer status http_loadbalancer example-app -n production
```

### Apply Configuration

```bash
# Create/update from file
f5xcctl load_balancer apply http_loadbalancer -n production -i http-lb.yaml

# Create/update from stdin
f5xcctl load_balancer apply http_loadbalancer -n production -i - <<EOF
...
EOF

# Create/update individual resources
f5xcctl load_balancer apply http_loadbalancer -n production -i lb.yaml
f5xcctl infrastructure apply origin_pool -n production -i origin.yaml
f5xcctl security apply app_firewall -n production -i waf.yaml
```

### Delete Resources

```bash
# Single resource
f5xcctl load_balancer delete http_loadbalancer example-app -n production

# Delete multiple resources
f5xcctl load_balancer delete http_loadbalancer lb1 -n production
f5xcctl load_balancer delete http_loadbalancer lb2 -n production

# Force delete
f5xcctl load_balancer delete http_loadbalancer example-app -n production --force
```

## Tips

### Use AI for Complex Configurations

Ask Claude to help build complex configs, then execute with f5xcctl:

> "Generate f5xcctl config for a load balancer with WAF, rate limiting, and multiple origin pools"

### Shell Aliases

```bash
# Add to ~/.zshrc or ~/.bashrc
alias xc='f5xcctl'
alias xclb='f5xcctl load_balancer'
alias xcinfra='f5xcctl infrastructure'
alias xcsec='f5xcctl security'
```

### Pipe to jq

```bash
# Filter JSON output
f5xcctl load_balancer list http_loadbalancer -n production | jq '.items[].metadata.name'
```

### Check Resource Status

```bash
# Monitor status
f5xcctl load_balancer status http_loadbalancer example-app -n production
```

## Troubleshooting

### "Authentication failed"

```bash
# Check credentials
f5xcctl whoami

# Verify URL
echo $VOLT_API_URL
```

### "Resource not found"

```bash
# List all to verify name
f5xcctl load_balancer list http_loadbalancer -n production

# Check namespace
f5xcctl tenant_management list namespace | grep production
```

### "Validation error"

```bash
# Validate config
f5xcctl load_balancer create http_loadbalancer -n production -i config.yaml --dry-run

# Get schema
f5xcctl load_balancer list http_loadbalancer -n production
```

## Next Steps

- [Terraform Integration](terraform.md)
- [Tools Reference](../tools/index.md)
- [Authentication](../configuration/authentication.md)
