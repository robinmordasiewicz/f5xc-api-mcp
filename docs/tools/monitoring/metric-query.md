---
page_title: f5xc_metric_query - f5xc-api-mcp
subcategory: Monitoring
description: Get Metric Query Data
---

# Metric Query

Returns time series data of monitor metric query by region

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-metric-query-create` | Get Metric Query Data |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Metric Query resources:

### Create Metric Query

> "Create a metric-query named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f metric_query.yaml

# Get
f5xcctl get metric_query {name} -n {namespace}

# List
f5xcctl get metric_querys -n {namespace}

# Delete
f5xcctl delete metric_query {name} -n {namespace}
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
