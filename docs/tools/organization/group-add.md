---
page_title: f5xc_group_add - f5xc-api-mcp
subcategory: Organization
description: Add user to groups
---

# Group Add

Assign existing user to specific groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-group-add-update` | Add user to groups |

## Example Usage

Ask Claude to help you work with Group Add resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f group_add.yaml

# Get
f5xcctl get group_add {name} -n {namespace}

# List
f5xcctl get group_adds -n {namespace}

# Delete
f5xcctl delete group_add {name} -n {namespace}
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
