---
page_title: f5xc_metric_query - f5xc-api-mcp
subcategory: Observability
description: GET Metric Query Data.
---

# Metric Query

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns time series data of monitor metric query by region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-metric-query-create` | GET Metric Query Data. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- metric-query

## Example Usage

Ask Claude to help you work with Metric Query resources:

### Create Metric Query

> "Create a metric-query named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh observability create metric_query -n <namespace> -i metric_query.yaml

# Get
xcsh observability get metric_query <name> -n <namespace>

# List
xcsh observability list metric_query -n <namespace>

# Delete
xcsh observability delete metric_query <name> -n <namespace>
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
