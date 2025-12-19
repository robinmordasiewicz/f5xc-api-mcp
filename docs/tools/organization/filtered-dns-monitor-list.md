---
page_title: f5xc_filtered_dns_monitor_list - f5xc-api-mcp
subcategory: Organization
description: Get Filtered DNS Monitor List
---

# Filtered DNS Monitor List

List v1_dns_monitor in a namespace based on filter

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-filtered-dns-monitor-list-list` | Get Filtered DNS Monitor List |

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

Ask Claude to help you work with Filtered DNS Monitor List resources:

### List Filtered DNS Monitor Lists

> "List all filtered-dns-monitor-lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create filtered_dns_monitor_list -n <namespace> -i filtered_dns_monitor_list.yaml

# Get
f5xcctl configuration get filtered_dns_monitor_list -n <namespace> <name>

# List
f5xcctl configuration list filtered_dns_monitor_list -n <namespace>

# Delete
f5xcctl configuration delete filtered_dns_monitor_list -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_filtered_dns_monitor_list" "example" {
  name      = "example-filtered-dns-monitor-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
