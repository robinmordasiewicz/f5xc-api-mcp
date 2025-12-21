---
page_title: f5xc_event - f5xc-api-mcp
subcategory: Security
description: Security Events Query.
---

# Event

GET security events for the given namespace.
For `system` namespace, all security events for the
tenant matching the query specified
in the request will be returned in the response. User may query
security events that matches various
fields such as `vh_name`, `sec_event_type`, `src_site`, `city`,
`country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-event-create` | Security Events Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Event resources:

### Create Event

> "Create a event named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create event -n <namespace> -i event.yaml

# Get
f5xcctl configuration get event -n <namespace> <name>

# List
f5xcctl configuration list event -n <namespace>

# Delete
f5xcctl configuration delete event -n <namespace> <name>
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
