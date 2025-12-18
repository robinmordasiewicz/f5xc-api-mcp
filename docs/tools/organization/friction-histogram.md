---
page_title: f5xc_friction_histogram - f5xc-api-mcp
subcategory: Organization
description: Friction Histogram Dashboard
---

# Friction Histogram

Get Histogram Aggregation chart data from shape recognize api

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-friction-histogram-create` | Friction Histogram Dashboard |

## Example Usage

Ask Claude to help you work with Friction Histogram resources:

### Create Friction Histogram

> "Create a friction-histogram named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f friction_histogram.yaml

# Get
f5xcctl get friction_histogram {name} -n {namespace}

# List
f5xcctl get friction_histograms -n {namespace}

# Delete
f5xcctl delete friction_histogram {name} -n {namespace}
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
