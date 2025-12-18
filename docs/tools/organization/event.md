---
page_title: f5xc_event - f5xc-api-mcp
subcategory: Organization
description: Security Events Query
---

# Event

Get security events for the given namespace.
For `system` namespace, all security events for the
tenant matching the query specified
in the request will be returned in the response. User may query
security events that matches various
fields such as `vh_name`, `sec_event_type`, `src_site`, `city`,
`country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-event-create` | Security Events Query |
| `f5xc-api-core-event-list` | Event details |
| `f5xc-api-core-event-update` | Edit event |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
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
f5xcctl apply -f event.yaml

# Get
f5xcctl get event {name} -n {namespace}

# List
f5xcctl get events -n {namespace}

# Delete
f5xcctl delete event {name} -n {namespace}
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
