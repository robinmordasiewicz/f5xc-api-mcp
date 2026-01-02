---
page_title: f5xc_favicon - f5xc-api-mcp
subcategory: Tenant And Identity
description: Tenant favicon.
---

# Favicon

!!! info "Low Risk"
    Operations on this resource are generally safe.

Receive current tenant favicon.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-favicon-list` | Tenant favicon. |

## Example Usage

Ask Claude to help you work with Favicon resources:

### List Favicons

> "List all favicons in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create favicon -n <namespace> -i favicon.yaml

# Get
xcsh tenant_and_identity get favicon <name> -n <namespace>

# List
xcsh tenant_and_identity list favicon -n <namespace>

# Delete
xcsh tenant_and_identity delete favicon <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_favicon" "example" {
  name      = "example-favicon"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
