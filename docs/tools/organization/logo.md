---
page_title: f5xc_logo - f5xc-api-mcp
subcategory: Organization
description: Tenant logo
---

# Logo

Receive current tenant logo.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-logo-list` | Tenant logo |

## Example Usage

Ask Claude to help you work with Logo resources:

### List Logos

> "List all logos in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f logo.yaml

# Get
f5xcctl get logo {name} -n {namespace}

# List
f5xcctl get logos -n {namespace}

# Delete
f5xcctl delete logo {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_logo" "example" {
  name      = "example-logo"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
