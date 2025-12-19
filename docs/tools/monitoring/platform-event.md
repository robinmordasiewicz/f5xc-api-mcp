---
page_title: f5xc_platform_event - f5xc-api-mcp
subcategory: Monitoring
description: Platform event Query
---

# Platform Event

Request to get platform event that matches the criteria in request for a given namespace.
If no
match conditions are specified in the request, then the response contains all
CRUD operations
performed in the namespace. User with access to the `system` namespace
may query for platform events
across all namespaces for a given tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-platform-event-create` | Platform event Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Platform Event resources:

### Create Platform Event

> "Create a platform-event named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f platform_event.yaml

# Get
f5xcctl get platform_event {name} -n {namespace}

# List
f5xcctl get platform_events -n {namespace}

# Delete
f5xcctl delete platform_event {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_platform_event" "example" {
  name      = "example-platform-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
