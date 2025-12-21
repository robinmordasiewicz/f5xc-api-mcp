---
page_title: f5xc_metric_query - f5xc-api-mcp
subcategory: Observability
description: GET Metric Query Data.
---

# Metric Query

Returns time series data of monitor metric query by region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-metric-query-create` | GET Metric Query Data. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Metric Query resources:

### Create Metric Query

> "Create a metric-query named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create metric_query -n <namespace> -i metric_query.yaml

# Get
f5xcctl configuration get metric_query -n <namespace> <name>

# List
f5xcctl configuration list metric_query -n <namespace>

# Delete
f5xcctl configuration delete metric_query -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_metric_query" "example" {
  name      = "example-metric-query"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
