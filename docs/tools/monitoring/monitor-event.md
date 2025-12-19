---
page_title: f5xc_monitor_event - f5xc-api-mcp
subcategory: Monitoring
description: Get Monitor Events
---

# Monitor Event

Returns the healthy and critical events for the specified monitor

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-monitor-event-list` | Get Monitor Events |

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
| `monitor_type` | monitor_type. x-required |
| `start_time` | start_time. x-required |

## Example Usage

Ask Claude to help you work with Monitor Event resources:

### List Monitor Events

> "List all monitor-events in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create monitor_event -n <namespace> -i monitor_event.yaml

# Get
f5xcctl configuration get monitor_event -n <namespace> <name>

# List
f5xcctl configuration list monitor_event -n <namespace>

# Delete
f5xcctl configuration delete monitor_event -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_monitor_event" "example" {
  name      = "example-monitor-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
