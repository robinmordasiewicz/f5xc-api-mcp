---
page_title: f5xc_friction_aggregation - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Friction Aggregation Dashboard.
---

# Friction Aggregation

GET Friction Aggregation chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-friction-aggregation-create` | Friction Aggregation Dashboard. |

## Example Usage

Ask Claude to help you work with Friction Aggregation resources:

### Create Friction Aggregation

> "Create a friction-aggregation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create friction_aggregation -n <namespace> -i friction_aggregation.yaml

# Get
f5xcctl shape_security get friction_aggregation <name> -n <namespace>

# List
f5xcctl shape_security list friction_aggregation -n <namespace>

# Delete
f5xcctl shape_security delete friction_aggregation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_friction_aggregation" "example" {
  name      = "example-friction-aggregation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
