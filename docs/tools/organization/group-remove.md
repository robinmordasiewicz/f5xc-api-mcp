---
page_title: f5xc_group_remove - f5xc-api-mcp
subcategory: Organization
description: remove user from groups
---

# Group Remove

remove existing user from specific groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-group-remove-update` | remove user from groups |

## Example Usage

Ask Claude to help you work with Group Remove resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f group_remove.yaml

# Get
f5xcctl get group_remove {name} -n {namespace}

# List
f5xcctl get group_removes -n {namespace}

# Delete
f5xcctl delete group_remove {name} -n {namespace}
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
