---
page_title: f5xc_assign_namespace_role - f5xc-api-mcp
subcategory: Identity
description: Assign role to User Group.
---

# Assign Namespace Role

AssignRole allows customers to assign a namespace/role pair to user group.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-assign-namespace-role-update` | Assign role to User Group. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name of the user group |

## Example Usage

Ask Claude to help you work with Assign Namespace Role resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create assign_namespace_role -n <namespace> -i assign_namespace_role.yaml

# Get
f5xcctl identity get assign_namespace_role <name> -n <namespace>

# List
f5xcctl identity list assign_namespace_role -n <namespace>

# Delete
f5xcctl identity delete assign_namespace_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_assign_namespace_role" "example" {
  name      = "example-assign-namespace-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
