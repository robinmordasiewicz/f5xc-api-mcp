---
page_title: f5xc_dns_monitor_summary - f5xc-api-mcp
subcategory: Observability
description: GET DNS Monitor Summary.
---

# DNS Monitor Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the DNS monitor health status, latency, and trend.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-dns-monitor-summary-list` | GET DNS Monitor Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End_time. | `2020-11-17T13:41:49.083255Z.` |
| `monitor_name` | Monitor_name. | `Monitor1` |
| `start_time` | Start_time. X-required | `2020-11-17T12:41:49.083255Z.` |

## Example Usage

Ask Claude to help you work with DNS Monitor Summary resources:

### List DNS Monitor Summarys

> "List all dns-monitor-summarys in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl observability dns-monitor-summary list --namespace {namespace}
```

List all dns-monitor-summarys

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create dns_monitor_summary -n <namespace> -i dns_monitor_summary.yaml

# Get
f5xcctl observability get dns_monitor_summary <name> -n <namespace>

# List
f5xcctl observability list dns_monitor_summary -n <namespace>

# Delete
f5xcctl observability delete dns_monitor_summary <name> -n <namespace>
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
