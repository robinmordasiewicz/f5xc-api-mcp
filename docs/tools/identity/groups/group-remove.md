---
page_title: f5xc_group_remove - f5xc-api-mcp
subcategory: Identity
description: Remove user from groups.
---

# Group Remove

Remove existing user from specific groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-group-remove-update` | Remove user from groups. |

## Example Usage

Ask Claude to help you work with Group Remove resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create group_remove -n <namespace> -i group_remove.yaml

# Get
f5xcctl configuration get group_remove -n <namespace> <name>

# List
f5xcctl configuration list group_remove -n <namespace>

# Delete
f5xcctl configuration delete group_remove -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_group_remove" "example" {
  name      = "example-group-remove"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
