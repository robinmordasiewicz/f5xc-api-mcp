---
page_title: f5xc_health_status_change_event - f5xc-api-mcp
subcategory: Monitoring
description: DNS Load Balancer Pool Member Health Status Change Events
---

# Health Status Change Event

Get DNS Load Balancer Pool Health Status Changes

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-health-status-change-event-list` | DNS Load Balancer Pool Member Health Status Change Events |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_lb_name` | DNS Load Balancer Name |
| `dns_lb_pool_name` | DNS Load Balancer Pool Name |
| `namespace` | Namespace |
| `pool_member_address` | DNS Load Balancer Pool Member Address |

## Example Usage

Ask Claude to help you work with Health Status Change Event resources:

### List Health Status Change Events

> "List all health-status-change-events in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f health_status_change_event.yaml

# Get
f5xcctl get health_status_change_event {name} -n {namespace}

# List
f5xcctl get health_status_change_events -n {namespace}

# Delete
f5xcctl delete health_status_change_event {name} -n {namespace}
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
