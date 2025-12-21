---
page_title: f5xc_metric - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Metrics
---

# Metric

BIG-IP APM metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-metric-create` | Metrics |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Metric resources:

### Create Metric

> "Create a metric named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl bigip create metric -n <namespace> -i metric.yaml

# Get
f5xcctl bigip get metric <name> -n <namespace>

# List
f5xcctl bigip list metric -n <namespace>

# Delete
f5xcctl bigip delete metric <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_metric" "example" {
  name      = "example-metric"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
