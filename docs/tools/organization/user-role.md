---
page_title: f5xc_user_role - f5xc-api-mcp
subcategory: Organization
description: Create User with Role Assignment
---

# User Role

Create creates a user and namespace roles binding for this user

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-user-role-create` | Create User with Role Assignment |
| `f5xc-api-core-user-role-list` | Get User and Role Assignments |
| `f5xc-api-core-user-role-update` | Update User and Role Assignments |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with User Role resources:

### Create User Role

> "Create a user-role named 'example' in the 'production' namespace"

### List User Roles

> "List all user-roles in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create user_role -n <namespace> -i user_role.yaml

# Get
f5xcctl configuration get user_role -n <namespace> <name>

# List
f5xcctl configuration list user_role -n <namespace>

# Delete
f5xcctl configuration delete user_role -n <namespace> <name>
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
