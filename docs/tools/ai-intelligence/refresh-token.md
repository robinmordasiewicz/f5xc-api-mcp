---
page_title: f5xc_refresh_token - f5xc-api-mcp
subcategory: AI Intelligence
description: Refresh Token.
---

# Refresh Token

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-aiintelligence-refresh-token-create` | Refresh Token. |

## Example Usage

Ask Claude to help you work with Refresh Token resources:

### Create Refresh Token

> "Create a refresh-token named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ai_intelligence create refresh_token -n <namespace> -i refresh_token.yaml

# Get
f5xcctl ai_intelligence get refresh_token <name> -n <namespace>

# List
f5xcctl ai_intelligence list refresh_token -n <namespace>

# Delete
f5xcctl ai_intelligence delete refresh_token <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_refresh_token" "example" {
  name      = "example-refresh-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
