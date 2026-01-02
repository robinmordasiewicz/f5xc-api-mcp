---
page_title: f5xc_metric - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: All Cloud Connect Metrics.
---

# Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Cloud Connect APIs are used to GET the data for cloud connect.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-metric-create` | All Cloud Connect Metrics. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- metric

## Example Usage

Ask Claude to help you work with Metric resources:

### Create Metric

> "Create a metric named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh cloud_infrastructure create metric -n <namespace> -i metric.yaml

# Get
xcsh cloud_infrastructure get metric <name> -n <namespace>

# List
xcsh cloud_infrastructure list metric -n <namespace>

# Delete
xcsh cloud_infrastructure delete metric <name> -n <namespace>
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
