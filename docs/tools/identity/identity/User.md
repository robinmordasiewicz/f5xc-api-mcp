---
page_title: f5xc_User - f5xc-api-mcp
subcategory: Identity
description: Create User with Role Assignment.
---

# User

Create creates a user and namespace roles binding for this user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-user-create` | Create User with Role Assignment. |
| `f5xc-api-identity-user-get` | GET User with ID. |
| `f5xc-api-identity-user-list` | GET all users. |
| `f5xc-api-identity-user-update` | Update User and Role Assignments. |
| `f5xc-api-identity-user-delete` | DELETE user by ID. |
| `f5xc-api-identity-user-patch` | PATCH User. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `excludedAttributes` | Members"]" |
| `count` | The number of entries after filter. |
| `filter` | Filter to be used for filtering objects. |
| `page` | Start offset. |

## Example Usage

Ask Claude to help you work with User resources:

### Create User

> "Create a User named 'example' in the 'production' namespace"

### List Users

> "List all Users in the 'production' namespace"

### Get User Details

> "Get details of the User named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create User -n <namespace> -i User.yaml

# Get
f5xcctl identity get User <name> -n <namespace>

# List
f5xcctl identity list User -n <namespace>

# Delete
f5xcctl identity delete User <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_User" "example" {
  name      = "example-User"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
