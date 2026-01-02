---
page_title: f5xc_logo - f5xc-api-mcp
subcategory: Tenant And Identity
description: Tenant logo.
---

# Logo

!!! info "Low Risk"
    Operations on this resource are generally safe.

Receive current tenant logo.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-logo-list` | Tenant logo. |

## Example Usage

Ask Claude to help you work with Logo resources:

### List Logos

> "List all logos in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create logo -n <namespace> -i logo.yaml

# Get
xcsh tenant_and_identity get logo <name> -n <namespace>

# List
xcsh tenant_and_identity list logo -n <namespace>

# Delete
xcsh tenant_and_identity delete logo <name> -n <namespace>
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
