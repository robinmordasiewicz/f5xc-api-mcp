---
page_title: f5xc_admin_reset - f5xc-api-mcp
subcategory: Identity
description: Reset password by admin.
---

# Admin Reset

Reset password by admin resets password for a user specified in request payload.
This request is
meant to be executed by the tenant's admin.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-admin-reset-create` | Reset password by admin. |
| `f5xc-api-identity-admin-reset-update` | ResetOtpDeviceByAdmin. |

## Example Usage

Ask Claude to help you work with Admin Reset resources:

### Create Admin Reset

> "Create a admin-reset named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create admin_reset -n <namespace> -i admin_reset.yaml

# Get
f5xcctl identity get admin_reset <name> -n <namespace>

# List
f5xcctl identity list admin_reset -n <namespace>

# Delete
f5xcctl identity delete admin_reset <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_admin_reset" "example" {
  name      = "example-admin-reset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
