---
page_title: f5xc_unassign - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Unassign domain owner.
---

# Unassign

Unassign domain owner tries to remove domain owner privilege from user in the request.
It checks
that requester is domain owner.
It implies such steps:

1) remove domain owner boolean flag
2) if
tenant has SSO enabled:

- mark user as SSO
- DELETE password credential
- DELETE OTP credential (if
exists)
NOTE: previously granted roles (including admin roles) will be retained.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-unassign-create` | Unassign domain owner. |

## Example Usage

Ask Claude to help you work with Unassign resources:

### Create Unassign

> "Create a unassign named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create unassign -n <namespace> -i unassign.yaml

# Get
f5xcctl tenant_management get unassign <name> -n <namespace>

# List
f5xcctl tenant_management list unassign -n <namespace>

# Delete
f5xcctl tenant_management delete unassign <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unassign" "example" {
  name      = "example-unassign"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
