---
page_title: f5xc_User - f5xc-api-mcp
subcategory: Organization
description: Create User with Role Assignment
---

# User

Create creates a user and namespace roles binding for this user

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-user-create` | Create User with Role Assignment |
| `f5xc-api-core-user-get` | Get User with ID |
| `f5xc-api-core-user-list` | Get all users |
| `f5xc-api-core-user-update` | Update User and Role Assignments |
| `f5xc-api-core-user-delete` | Delete user by ID |
| `f5xc-api-core-user-patch` | Patch User |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Id |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `excludedAttributes` | The excludedAttributes parameter |
| `count` | The count parameter |
| `filter` | The filter parameter |
| `page` | The page parameter |

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
f5xcctl apply -f User.yaml

# Get
f5xcctl get User {name} -n {namespace}

# List
f5xcctl get Users -n {namespace}

# Delete
f5xcctl delete User {name} -n {namespace}
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
