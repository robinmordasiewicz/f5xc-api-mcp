---
page_title: f5xc_segment_metric - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: All Cloud Connect Segment Metrics.
---

# Segment Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Cloud Connect APIs are used to GET the segment data for cloud connect.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-segment-metric-create` | All Cloud Connect Segment Metrics. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- segment-metric

## Example Usage

Ask Claude to help you work with Segment Metric resources:

### Create Segment Metric

> "Create a segment-metric named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh cloud_infrastructure create segment_metric -n <namespace> -i segment_metric.yaml

# Get
xcsh cloud_infrastructure get segment_metric <name> -n <namespace>

# List
xcsh cloud_infrastructure list segment_metric -n <namespace>

# Delete
xcsh cloud_infrastructure delete segment_metric <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_segment_metric" "example" {
  name      = "example-segment-metric"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
