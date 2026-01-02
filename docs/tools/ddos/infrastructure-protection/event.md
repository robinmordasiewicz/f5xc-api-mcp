---
page_title: f5xc_event - f5xc-api-mcp
subcategory: Ddos
description: List of events.
---

# Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns a list of events. Events are created when a high priority mitigation is started. Events then
serve as a
one stop shop to review activities to mitigate a DDoS attack.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-event-create` | List of events. |
| `f5xc-api-ddos-event-list` | Event details. |
| `f5xc-api-ddos-event-update` | Edit event. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `event_id` | Event ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- event

**Modifies:**

- event

## Example Usage

Ask Claude to help you work with Event resources:

### Create Event

> "Create a event named 'example' in the 'production' namespace"

### List Events

> "List all events in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create event -n <namespace> -i event.yaml

# Get
xcsh ddos get event <name> -n <namespace>

# List
xcsh ddos list event -n <namespace>

# Delete
xcsh ddos delete event <name> -n <namespace>
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
