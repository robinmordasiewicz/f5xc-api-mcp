---
page_title: f5xc_user_token - f5xc-api-mcp
subcategory: Organization
description: Get Web App Scanning Service User Token
---

# User Token

Get one time token to connect Web App Scanning Service

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-user-token-list` | Get Web App Scanning Service User Token |

## Example Usage

Ask Claude to help you work with User Token resources:

### List User Tokens

> "List all user-tokens in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f user_token.yaml

# Get
f5xcctl get user_token {name} -n {namespace}

# List
f5xcctl get user_tokens -n {namespace}

# Delete
f5xcctl delete user_token {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_user_token" "example" {
  name      = "example-user-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
