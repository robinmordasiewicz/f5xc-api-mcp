---
page_title: f5xc_health_status_change_event - f5xc-api-mcp
subcategory: DNS
description: DNS Load Balancer Pool Member Health Status Change Events.
---

# Health Status Change Event

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET DNS Load Balancer Pool Health Status Changes.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-health-status-change-event-list` | DNS Load Balancer Pool Member Health Status Change Events. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_lb_name` | DNS Load Balancer Name | `Dns_lb1` |
| `dns_lb_pool_name` | DNS Load Balancer Pool Name | `Dns_lb_pool1.` |
| `namespace` | Namespace | `Ns1` |
| `pool_member_address` | DNS Load Balancer Pool Member Address | `10.0.0.1` |

## Example Usage

Ask Claude to help you work with Health Status Change Event resources:

### List Health Status Change Events

> "List all health-status-change-events in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data health-status-change-event list --namespace {namespace}
```

List all health-status-change-events

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create health_status_change_event -n <namespace> -i health_status_change_event.yaml

# Get
f5xcctl dns get health_status_change_event <name> -n <namespace>

# List
f5xcctl dns list health_status_change_event -n <namespace>

# Delete
f5xcctl dns delete health_status_change_event <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_health_status_change_event" "example" {
  name      = "example-health-status-change-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
