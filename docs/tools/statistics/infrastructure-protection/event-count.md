---
page_title: f5xc_event_count - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Event count.
---

# Event Count

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Event counts over a period of time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-event-count-create` | L3l4 Event count. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `network_id` | NetworkId | `3c33d46b-8f19-420c-9202-038c5833ac55.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- event-count

## Example Usage

Ask Claude to help you work with Event Count resources:

### Create Event Count

> "Create a event-count named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create event_count -n <namespace> -i event_count.yaml

# Get
xcsh statistics get event_count <name> -n <namespace>

# List
xcsh statistics list event_count -n <namespace>

# Delete
xcsh statistics delete event_count <name> -n <namespace>
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
