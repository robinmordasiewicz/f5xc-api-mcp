---
page_title: f5xc_logo - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Tenant logo.
---

# Logo

Receive current tenant logo.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-logo-list` | Tenant logo. |

## Example Usage

Ask Claude to help you work with Logo resources:

### List Logos

> "List all logos in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create logo -n <namespace> -i logo.yaml

# Get
f5xcctl configuration get logo -n <namespace> <name>

# List
f5xcctl configuration list logo -n <namespace>

# Delete
f5xcctl configuration delete logo -n <namespace> <name>
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
