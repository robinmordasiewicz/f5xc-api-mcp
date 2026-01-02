---
page_title: f5xc_events_summary - f5xc-api-mcp
subcategory: Ddos
description: Simple events view.
---

# Events Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Return a list of available event (suitable for an alert)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-events-summary-list` | Simple events view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `alert_id` | Optional - allows to filter events by alert so only relevant events are returned. If not provided, all user events are returned. | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |

## Example Usage

Ask Claude to help you work with Events Summary resources:

### List Events Summarys

> "List all events-summarys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create events_summary -n <namespace> -i events_summary.yaml

# Get
xcsh ddos get events_summary <name> -n <namespace>

# List
xcsh ddos list events_summary -n <namespace>

# Delete
xcsh ddos delete events_summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_events_summary" "example" {
  name      = "example-events-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
