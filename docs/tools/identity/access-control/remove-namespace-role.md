---
page_title: f5xc_remove_namespace_role - f5xc-api-mcp
subcategory: Identity
description: Remove role from User Group.
---

# Remove Namespace Role

RemoveRole allows customers to remove a namespace/role from the user group.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-remove-namespace-role-update` | Remove role from User Group. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name of the user group |

## Example Usage

Ask Claude to help you work with Remove Namespace Role resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create remove_namespace_role -n <namespace> -i remove_namespace_role.yaml

# Get
f5xcctl configuration get remove_namespace_role -n <namespace> <name>

# List
f5xcctl configuration list remove_namespace_role -n <namespace>

# Delete
f5xcctl configuration delete remove_namespace_role -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_remove_namespace_role" "example" {
  name      = "example-remove-namespace-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
