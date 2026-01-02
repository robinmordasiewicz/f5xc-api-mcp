---
page_title: f5xc_global_history - f5xc-api-mcp
subcategory: Observability
description: GET Global History.
---

# Global History

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns a time series of critical monitor counts in namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-global-history-list` | GET Global History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End_time. | `2020-11-17T13:41:49.083255Z.` |
| `monitor_type` | Monitor_type. | `HTTP` |
| `start_time` | Start_time. | `2020-11-17T12:41:49.083255Z.` |
| `step_size` | Step_size. | `300s` |

## Example Usage

Ask Claude to help you work with Global History resources:

### List Global Historys

> "List all global-historys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh observability create global_history -n <namespace> -i global_history.yaml

# Get
xcsh observability get global_history <name> -n <namespace>

# List
xcsh observability list global_history -n <namespace>

# Delete
xcsh observability delete global_history <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_global_history" "example" {
  name      = "example-global-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
