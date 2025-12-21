---
page_title: f5xc_role_user - f5xc-api-mcp
subcategory: Identity
description: Assign role to User.
---

# Role User

AssignRole allows customers to assign a namespace/role pair to multiple users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-role-user-create` | Assign role to User. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Role User resources:

### Create Role User

> "Create a role-user named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create role_user -n <namespace> -i role_user.yaml

# Get
f5xcctl identity get role_user <name> -n <namespace>

# List
f5xcctl identity list role_user -n <namespace>

# Delete
f5xcctl identity delete role_user <name> -n <namespace>
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
