---
page_title: f5xc_user_group - f5xc-api-mcp
subcategory: Organization
description: Create User Group
---

# User Group

Replace allows updating of the different user group fields like the display name, description, user
associations and rbac accesses.
The name of the user group cannot be edited and the sync_id can be
edited only when SCIM is enabled for the tenant.
If any of the editable fields are nil / empty in
the request, it will be considered as the removal of the field value.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-user-group-create` | Create User Group |
| `f5xc-api-core-user-group-get` | Fetch all the details for a group provided the group ID |
| `f5xc-api-core-user-group-list` | Get all User Groups for the tenant |
| `f5xc-api-core-user-group-update` | Replace the User Group fields / accesses / associations |
| `f5xc-api-core-user-group-delete` | Delete a group provided the group ID |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name of the user group |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `attempt_remove_references` | The attempt_remove_references parameter |

## Example Usage

Ask Claude to help you work with User Group resources:

### Create User Group

> "Create a user-group named 'example' in the 'production' namespace"

### List User Groups

> "List all user-groups in the 'production' namespace"

### Get User Group Details

> "Get details of the user-group named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f user_group.yaml

# Get
f5xcctl get user_group {name} -n {namespace}

# List
f5xcctl get user_groups -n {namespace}

# Delete
f5xcctl delete user_group {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_user_group" "example" {
  name      = "example-user-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
