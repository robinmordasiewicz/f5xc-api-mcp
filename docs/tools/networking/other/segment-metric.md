---
page_title: f5xc_segment_metric - f5xc-api-mcp
subcategory: Networking
description: All Cloud Connect Segment Metrics.
---

# Segment Metric

Cloud Connect APIs are used to GET the segment data for cloud connect.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-segment-metric-create` | All Cloud Connect Segment Metrics. |

## Example Usage

Ask Claude to help you work with Segment Metric resources:

### Create Segment Metric

> "Create a segment-metric named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create segment_metric -n <namespace> -i segment_metric.yaml

# Get
f5xcctl configuration get segment_metric -n <namespace> <name>

# List
f5xcctl configuration list segment_metric -n <namespace>

# Delete
f5xcctl configuration delete segment_metric -n <namespace> <name>
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
