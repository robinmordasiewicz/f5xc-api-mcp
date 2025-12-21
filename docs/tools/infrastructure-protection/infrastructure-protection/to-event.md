---
page_title: f5xc_to_event - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Link Alert to Event.
---

# To Event

Allows customers to link alerts with events. This helps with tracking of any mitigation activity and
event investigation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-to-event-update` | Link Alert to Event. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `alert_id` | Alert ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with To Event resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create to_event -n <namespace> -i to_event.yaml

# Get
f5xcctl configuration get to_event -n <namespace> <name>

# List
f5xcctl configuration list to_event -n <namespace>

# Delete
f5xcctl configuration delete to_event -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_to_event" "example" {
  name      = "example-to-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
