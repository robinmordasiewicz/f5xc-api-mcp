---
page_title: f5xc_filtered_http_monitor_list - f5xc-api-mcp
subcategory: Monitoring
description: Get Filtered HTTP Monitor List
---

# Filtered HTTP Monitor List

List v1_http_monitor in a namespace based on filter

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-filtered-http-monitor-list-list` | Get Filtered HTTP Monitor List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `filter` | monitor filter. |
| `limit` | limit. |
| `page` | page. |
| `sort` | sort. |

## Example Usage

Ask Claude to help you work with Filtered HTTP Monitor List resources:

### List Filtered HTTP Monitor Lists

> "List all filtered-http-monitor-lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create filtered_http_monitor_list -n <namespace> -i filtered_http_monitor_list.yaml

# Get
f5xcctl configuration get filtered_http_monitor_list -n <namespace> <name>

# List
f5xcctl configuration list filtered_http_monitor_list -n <namespace>

# Delete
f5xcctl configuration delete filtered_http_monitor_list -n <namespace> <name>
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
