---
page_title: f5xc_friction_histogram - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Friction Histogram Dashboard.
---

# Friction Histogram

GET Histogram Aggregation chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-friction-histogram-create` | Friction Histogram Dashboard. |

## Example Usage

Ask Claude to help you work with Friction Histogram resources:

### Create Friction Histogram

> "Create a friction-histogram named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create friction_histogram -n <namespace> -i friction_histogram.yaml

# Get
f5xcctl configuration get friction_histogram -n <namespace> <name>

# List
f5xcctl configuration list friction_histogram -n <namespace>

# Delete
f5xcctl configuration delete friction_histogram -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_friction_histogram" "example" {
  name      = "example-friction-histogram"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
