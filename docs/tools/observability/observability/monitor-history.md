---
page_title: f5xc_monitor_history - f5xc-api-mcp
subcategory: Observability
description: GET Monitor History.
---

# Monitor History

Returns the healthy and critical statuses for the specified monitor.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-monitor-history-list` | GET Monitor History. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | End_time. |
| `monitor_name` | Monitor_name. X-required |
| `monitor_type` | Monitor_type. X-required |
| `start_time` | Start_time. X-required |
| `step_size` | Step_size. |

## Example Usage

Ask Claude to help you work with Monitor History resources:

### List Monitor Historys

> "List all monitor-historys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create monitor_history -n <namespace> -i monitor_history.yaml

# Get
f5xcctl observability get monitor_history <name> -n <namespace>

# List
f5xcctl observability list monitor_history -n <namespace>

# Delete
f5xcctl observability delete monitor_history <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_monitor_history" "example" {
  name      = "example-monitor-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
