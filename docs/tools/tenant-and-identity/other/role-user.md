---
page_title: f5xc_role_user - f5xc-api-mcp
subcategory: Tenant And Identity
description: Assign role to User.
---

# Role User

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AssignRole allows customers to assign a namespace/role pair to multiple users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-role-user-create` | Assign role to User. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- role-user

## Example Usage

Ask Claude to help you work with Role User resources:

### Create Role User

> "Create a role-user named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create role_user -n <namespace> -i role_user.yaml

# Get
xcsh tenant_and_identity get role_user <name> -n <namespace>

# List
xcsh tenant_and_identity list role_user -n <namespace>

# Delete
xcsh tenant_and_identity delete role_user <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_role_user" "example" {
  name      = "example-role-user"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
