---
page_title: f5xc_lookup_user_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: Lookup User Roles.
---

# Lookup User Role

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

LookupUserRoles returns roles for the the given user, namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-lookup-user-role-create` | Lookup User Roles. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- lookup-user-role

## Example Usage

Ask Claude to help you work with Lookup User Role resources:

### Create Lookup User Role

> "Create a lookup-user-role named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create lookup_user_role -n <namespace> -i lookup_user_role.yaml

# Get
xcsh tenant_and_identity get lookup_user_role <name> -n <namespace>

# List
xcsh tenant_and_identity list lookup_user_role -n <namespace>

# Delete
xcsh tenant_and_identity delete lookup_user_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_lookup_user_role" "example" {
  name      = "example-lookup-user-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
