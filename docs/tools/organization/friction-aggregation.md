---
page_title: f5xc_friction_aggregation - f5xc-api-mcp
subcategory: Organization
description: Friction Aggregation Dashboard
---

# Friction Aggregation

Get Friction Aggregation chart data from shape recognize api

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-friction-aggregation-create` | Friction Aggregation Dashboard |

## Example Usage

Ask Claude to help you work with Friction Aggregation resources:

### Create Friction Aggregation

> "Create a friction-aggregation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f friction_aggregation.yaml

# Get
f5xcctl get friction_aggregation {name} -n {namespace}

# List
f5xcctl get friction_aggregations -n {namespace}

# Delete
f5xcctl delete friction_aggregation {name} -n {namespace}
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
