---
page_title: f5xc_http_monitor_detail - f5xc-api-mcp
subcategory: Monitoring
description: Get HTTP Monitor Detail
---

# HTTP Monitor Detail

Returns the monitor latency, trend, and health by region

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-http-monitor-detail-list` | Get HTTP Monitor Detail |

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

Ask Claude to help you work with HTTP Monitor Detail resources:

### List HTTP Monitor Details

> "List all http-monitor-details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create http_monitor_detail -n <namespace> -i http_monitor_detail.yaml

# Get
f5xcctl configuration get http_monitor_detail -n <namespace> <name>

# List
f5xcctl configuration list http_monitor_detail -n <namespace>

# Delete
f5xcctl configuration delete http_monitor_detail -n <namespace> <name>
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
