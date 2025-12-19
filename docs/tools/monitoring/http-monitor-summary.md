---
page_title: f5xc_http_monitor_summary - f5xc-api-mcp
subcategory: Monitoring
description: Get HTTP Monitor Summary
---

# HTTP Monitor Summary

Returns the HTTP monitor health status, latency, and trend

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-http-monitor-summary-list` | Get HTTP Monitor Summary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | end_time. |
| `monitor_name` | monitor_name. x-required |
| `start_time` | start_time. x-required |

## Example Usage

Ask Claude to help you work with HTTP Monitor Summary resources:

### List HTTP Monitor Summarys

> "List all http-monitor-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f http_monitor_summary.yaml

# Get
f5xcctl get http_monitor_summary {name} -n {namespace}

# List
f5xcctl get http_monitor_summarys -n {namespace}

# Delete
f5xcctl delete http_monitor_summary {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_http_monitor_summary" "example" {
  name      = "example-http-monitor-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
