---
page_title: f5xc_http_monitor_summary - f5xc-api-mcp
subcategory: Observability
description: GET HTTP Monitor Summary.
---

# HTTP Monitor Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the HTTP monitor health status, latency, and trend.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-http-monitor-summary-list` | GET HTTP Monitor Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End_time. | `2020-11-17T13:41:49.083255Z.` |
| `monitor_name` | Monitor_name. X-required | `Monitor1` |
| `start_time` | Start_time. X-required | `2020-11-17T12:41:49.083255Z.` |

## Example Usage

Ask Claude to help you work with HTTP Monitor Summary resources:

### List HTTP Monitor Summarys

> "List all http-monitor-summarys in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl observability http-monitor-summary list --namespace {namespace}
```

List all http-monitor-summarys

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create http_monitor_summary -n <namespace> -i http_monitor_summary.yaml

# Get
f5xcctl observability get http_monitor_summary <name> -n <namespace>

# List
f5xcctl observability list http_monitor_summary -n <namespace>

# Delete
f5xcctl observability delete http_monitor_summary <name> -n <namespace>
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
