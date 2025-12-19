---
page_title: f5xc_events_summary - f5xc-api-mcp
subcategory: Monitoring
description: Simple events view
---

# Events Summary

Return a list of available event (suitable for an alert)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-events-summary-list` | Simple events view |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `alert_id` | The alert_id parameter |

## Example Usage

Ask Claude to help you work with Events Summary resources:

### List Events Summarys

> "List all events-summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create events_summary -n <namespace> -i events_summary.yaml

# Get
f5xcctl configuration get events_summary -n <namespace> <name>

# List
f5xcctl configuration list events_summary -n <namespace>

# Delete
f5xcctl configuration delete events_summary -n <namespace> <name>
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
