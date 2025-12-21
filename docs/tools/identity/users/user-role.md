---
page_title: f5xc_user_role - f5xc-api-mcp
subcategory: Identity
description: Create User with Role Assignment.
---

# User Role

Create creates a user and namespace roles binding for this user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-user-role-create` | Create User with Role Assignment. |
| `f5xc-api-identity-user-role-list` | GET User and Role Assignments. |
| `f5xc-api-identity-user-role-update` | Update User and Role Assignments. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with User Role resources:

### Create User Role

> "Create a user-role named 'example' in the 'production' namespace"

### List User Roles

> "List all user-roles in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create user_role -n <namespace> -i user_role.yaml

# Get
f5xcctl identity get user_role <name> -n <namespace>

# List
f5xcctl identity list user_role -n <namespace>

# Delete
f5xcctl identity delete user_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_user_role" "example" {
  name      = "example-user-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
