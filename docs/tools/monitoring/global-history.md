---
page_title: f5xc_global_history - f5xc-api-mcp
subcategory: Monitoring
description: Get Global History
---

# Global History

Returns a time series of critical monitor counts in namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-global-history-list` | Get Global History |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | end_time. |
| `monitor_type` | monitor_type. |
| `start_time` | start_time. |
| `step_size` | step_size. |

## Example Usage

Ask Claude to help you work with Global History resources:

### List Global Historys

> "List all global-historys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f global_history.yaml

# Get
f5xcctl get global_history {name} -n {namespace}

# List
f5xcctl get global_historys -n {namespace}

# Delete
f5xcctl delete global_history {name} -n {namespace}
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
