---
page_title: f5xc_events_summary - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Simple events view.
---

# Events Summary

Return a list of available event (suitable for an alert)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-events-summary-list` | Simple events view. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `alert_id` | Optional - allows to filter events by alert so only relevant events are returned. If not provided, all user events are returned. |

## Example Usage

Ask Claude to help you work with Events Summary resources:

### List Events Summarys

> "List all events-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create events_summary -n <namespace> -i events_summary.yaml

# Get
f5xcctl infrastructure_protection get events_summary <name> -n <namespace>

# List
f5xcctl infrastructure_protection list events_summary -n <namespace>

# Delete
f5xcctl infrastructure_protection delete events_summary <name> -n <namespace>
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
