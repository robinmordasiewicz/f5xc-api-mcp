---
page_title: f5xc_source_summary - f5xc-api-mcp
subcategory: Organization
description: Get Source Summary
---

# Source Summary

Returns the healthy and critical status count, latency, and coordinates for each source region

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-source-summary-list` | Get Source Summary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `label_filter` | label_filter. |
| `monitor_name` | monitor_name. |
| `monitor_type` | monitor_type. x-required |

## Example Usage

Ask Claude to help you work with Source Summary resources:

### List Source Summarys

> "List all source-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f source_summary.yaml

# Get
f5xcctl get source_summary {name} -n {namespace}

# List
f5xcctl get source_summarys -n {namespace}

# Delete
f5xcctl delete source_summary {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_source_summary" "example" {
  name      = "example-source-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
