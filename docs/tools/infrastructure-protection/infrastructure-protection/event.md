---
page_title: f5xc_event - f5xc-api-mcp
subcategory: Infrastructure Protection
description: List of events.
---

# Event

Returns a list of events. Events are created when a high priority mitigation is started. Events then
serve as a
one stop shop to review activities to mitigate a DDoS attack.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-event-create` | List of events. |
| `f5xc-api-infrastructureprotection-event-list` | Event details. |
| `f5xc-api-infrastructureprotection-event-update` | Edit event. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `event_id` | Event ID |

## Example Usage

Ask Claude to help you work with Event resources:

### Create Event

> "Create a event named 'example' in the 'production' namespace"

### List Events

> "List all events in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create event -n <namespace> -i event.yaml

# Get
f5xcctl infrastructure_protection get event <name> -n <namespace>

# List
f5xcctl infrastructure_protection list event -n <namespace>

# Delete
f5xcctl infrastructure_protection delete event <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_event" "example" {
  name      = "example-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
