---
page_title: f5xc_filtered_http_monitor_list - f5xc-api-mcp
subcategory: Observability
description: GET Filtered HTTP Monitor List.
---

# Filtered HTTP Monitor List

List v1_http_monitor in a namespace based on filter.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-filtered-http-monitor-list-list` | GET Filtered HTTP Monitor List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `filter` | Monitor filter. |
| `limit` | Limit. |
| `page` | Page. |
| `sort` | Sort. |

## Example Usage

Ask Claude to help you work with Filtered HTTP Monitor List resources:

### List Filtered HTTP Monitor Lists

> "List all filtered-http-monitor-lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create filtered_http_monitor_list -n <namespace> -i filtered_http_monitor_list.yaml

# Get
f5xcctl observability get filtered_http_monitor_list <name> -n <namespace>

# List
f5xcctl observability list filtered_http_monitor_list -n <namespace>

# Delete
f5xcctl observability delete filtered_http_monitor_list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_filtered_http_monitor_list" "example" {
  name      = "example-filtered-http-monitor-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
