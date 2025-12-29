---
page_title: f5xc_http_monitor_detail - f5xc-api-mcp
subcategory: Observability
description: GET HTTP Monitor Detail.
---

# HTTP Monitor Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the monitor latency, trend, and health by region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-http-monitor-detail-list` | GET HTTP Monitor Detail. |

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

Ask Claude to help you work with HTTP Monitor Detail resources:

### List HTTP Monitor Details

> "List all http-monitor-details in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl observability http-monitor-detail list --namespace {namespace}
```

List all http-monitor-details

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create http_monitor_detail -n <namespace> -i http_monitor_detail.yaml

# Get
f5xcctl observability get http_monitor_detail <name> -n <namespace>

# List
f5xcctl observability list http_monitor_detail -n <namespace>

# Delete
f5xcctl observability delete http_monitor_detail <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_http_monitor_detail" "example" {
  name      = "example-http-monitor-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
