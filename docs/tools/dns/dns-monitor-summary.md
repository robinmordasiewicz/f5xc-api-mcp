---
page_title: f5xc_dns_monitor_summary - f5xc-api-mcp
subcategory: DNS
description: Get DNS Monitor Summary
---

# DNS Monitor Summary

Returns the DNS monitor health status, latency, and trend

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-dns-monitor-summary-list` | Get DNS Monitor Summary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | end_time. |
| `monitor_name` | monitor_name. |
| `start_time` | start_time. x-required |

## Example Usage

Ask Claude to help you work with DNS Monitor Summary resources:

### List DNS Monitor Summarys

> "List all dns-monitor-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create dns_monitor_summary -n <namespace> -i dns_monitor_summary.yaml

# Get
f5xcctl configuration get dns_monitor_summary -n <namespace> <name>

# List
f5xcctl configuration list dns_monitor_summary -n <namespace>

# Delete
f5xcctl configuration delete dns_monitor_summary -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_dns_monitor_summary" "example" {
  name      = "example-dns-monitor-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
