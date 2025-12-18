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
| `f5xc-api-waap-http-loadbalancer-list` | `f5xcctl get http_loadbalancers -n {namespace}` |
| `f5xc-api-waap-http-loadbalancer-get` | `f5xcctl get http_loadbalancer {name} -n {namespace}` |
| `f5xc-api-waap-http-loadbalancer-create` | `f5xcctl apply -f config.yaml` |
| `f5xc-api-waap-http-loadbalancer-delete` | `f5xcctl delete http_loadbalancer {name} -n {namespace}` |

### Output Formats

```bash
# YAML output (default)
f5xcctl get http_loadbalancer example-app -n production -o yaml

# JSON output
f5xcctl get http_loadbalancer example-app -n production -o json

# Table output
f5xcctl get http_loadbalancers -n production -o table

# Terraform output
f5xcctl get http_loadbalancer example-app -n production -o terraform
```

## Workflow Examples

### AI-Assisted Configuration

1. Ask Claude to generate configuration:

   > "Create an HTTP load balancer for api.example.com"

2. Get the f5xcctl command from the response:

   ```bash
   f5xcctl apply -f - <<EOF
   apiVersion: config.volterra.io/v1
   kind: http_loadbalancer
   ...
   EOF
   ```

3. Execute in terminal

### Validate Before Apply

Use `--dry-run` to validate:

```bash
f5xcctl apply -f config.yaml --dry-run
```

### Export Existing Resources

```bash
# Export to file
f5xcctl get http_loadbalancer example-app -n production -o yaml > example-app.yaml

# Export multiple resources
f5xcctl get http_loadbalancers -n production -o yaml > all-lbs.yaml
```

### Diff Changes

```bash
# Compare local config with remote
f5xcctl diff -f config.yaml
```

## Common Commands

### List Resources

```bash
# All namespaces
f5xcctl get namespaces

# Resources in namespace
f5xcctl get http_loadbalancers -n production
f5xcctl get origin_pools -n production
f5xcctl get app_firewalls -n production
```

### Get Resource Details

```bash
# Detailed output
f5xcctl get http_loadbalancer example-app -n production -o yaml

# With status
f5xcctl get http_loadbalancer example-app -n production --show-status
```

### Apply Configuration

```bash
# From file
f5xcctl apply -f http-lb.yaml

# From stdin
f5xcctl apply -f - <<EOF
...
EOF

# Multiple files
f5xcctl apply -f lb.yaml -f origin.yaml -f waf.yaml
```

### Delete Resources

```bash
# Single resource
f5xcctl delete http_loadbalancer example-app -n production

# From file
f5xcctl delete -f http-lb.yaml

# Force delete
f5xcctl delete http_loadbalancer example-app -n production --force
```

## Tips

### Use AI for Complex Configurations

Ask Claude to help build complex configs, then execute with f5xcctl:

> "Generate f5xcctl config for a load balancer with WAF, rate limiting, and multiple origin pools"

### Shell Aliases

```bash
# Add to ~/.zshrc or ~/.bashrc
alias xc='f5xcctl'
alias xcget='f5xcctl get'
alias xcapply='f5xcctl apply -f'
```

### Pipe to jq

```bash
# Filter JSON output
f5xcctl get http_loadbalancers -n production -o json | jq '.items[].metadata.name'
```

### Watch Resources

```bash
# Monitor status changes
watch f5xcctl get http_loadbalancer example-app -n production --show-status
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
f5xcctl get http_loadbalancers -n production

# Check namespace
f5xcctl get namespaces | grep production
```

### "Validation error"

```bash
# Validate config
f5xcctl apply -f config.yaml --dry-run

# Get schema
f5xcctl explain http_loadbalancer
```

## Next Steps

- [Terraform Integration](terraform.md)
- [Tools Reference](../tools/index.md)
- [Authentication](../configuration/authentication.md)
