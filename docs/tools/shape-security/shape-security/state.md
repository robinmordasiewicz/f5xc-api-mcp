---
page_title: f5xc_state - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: State
---

# State

GET customer State if after or before.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-state-list` | State |

## Example Usage

Ask Claude to help you work with State resources:

### List States

> "List all states in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create state -n <namespace> -i state.yaml

# Get
f5xcctl shape_security get state <name> -n <namespace>

# List
f5xcctl shape_security list state -n <namespace>

# Delete
f5xcctl shape_security delete state <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_state" "example" {
  name      = "example-state"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
