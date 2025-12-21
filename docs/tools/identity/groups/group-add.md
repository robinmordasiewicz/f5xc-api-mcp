---
page_title: f5xc_group_add - f5xc-api-mcp
subcategory: Identity
description: Add user to groups.
---

# Group Add

Assign existing user to specific groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-group-add-update` | Add user to groups. |

## Example Usage

Ask Claude to help you work with Group Add resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create group_add -n <namespace> -i group_add.yaml

# Get
f5xcctl configuration get group_add -n <namespace> <name>

# List
f5xcctl configuration list group_add -n <namespace>

# Delete
f5xcctl configuration delete group_add -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_group_add" "example" {
  name      = "example-group-add"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
