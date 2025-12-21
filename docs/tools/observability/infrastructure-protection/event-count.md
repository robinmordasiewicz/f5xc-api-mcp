---
page_title: f5xc_event_count - f5xc-api-mcp
subcategory: Observability
description: L3l4 Event count.
---

# Event Count

Request to GET l3l4 Event counts over a period of time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-event-count-create` | L3l4 Event count. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `network_id` | NetworkId |

## Example Usage

Ask Claude to help you work with Event Count resources:

### Create Event Count

> "Create a event-count named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create event_count -n <namespace> -i event_count.yaml

# Get
f5xcctl observability get event_count <name> -n <namespace>

# List
f5xcctl observability list event_count -n <namespace>

# Delete
f5xcctl observability delete event_count <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_event_count" "example" {
  name      = "example-event-count"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
