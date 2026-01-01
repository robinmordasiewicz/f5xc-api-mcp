---
page_title: f5xc_metric - f5xc-api-mcp
subcategory: Sites
description: Pods Metrics.
---

# Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET pods metrics for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-metric-create` | Pods Metrics. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |
| `site` | Site | `Site-1` |

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
xcsh sites create metric -n <namespace> -i metric.yaml

# Get
xcsh sites get metric <name> -n <namespace>

# List
xcsh sites list metric -n <namespace>

# Delete
xcsh sites delete metric <name> -n <namespace>
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
