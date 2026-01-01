---
page_title: f5xc_admin_reset - f5xc-api-mcp
subcategory: Tenant And Identity
description: Reset password by admin.
---

# Admin Reset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reset password by admin resets password for a user specified in request payload.
This request is
meant to be executed by the tenant's admin.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-admin-reset-create` | Reset password by admin. |
| `f5xc-api-tenantandidentity-admin-reset-update` | ResetOtpDeviceByAdmin. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- admin-reset

**Modifies:**

- admin-reset

## Example Usage

Ask Claude to help you work with Admin Reset resources:

### Create Admin Reset

> "Create a admin-reset named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create admin_reset -n <namespace> -i admin_reset.yaml

# Get
xcsh tenant_and_identity get admin_reset <name> -n <namespace>

# List
xcsh tenant_and_identity list admin_reset -n <namespace>

# Delete
xcsh tenant_and_identity delete admin_reset <name> -n <namespace>
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
