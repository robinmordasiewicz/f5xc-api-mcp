---
page_title: f5xc_platform_event - f5xc-api-mcp
subcategory: Statistics
description: Platform event Query.
---

# Platform Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET platform event that matches the criteria in request for a given namespace.
If no
match conditions are specified in the request, then the response contains all
CRUD operations
performed in the namespace. User with access to the `system` namespace
may query for platform events
across all namespaces for a given tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-platform-event-create` | Platform event Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- platform-event

## Example Usage

Ask Claude to help you work with Platform Event resources:

### Create Platform Event

> "Create a platform-event named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create platform_event -n <namespace> -i platform_event.yaml

# Get
xcsh statistics get platform_event <name> -n <namespace>

# List
xcsh statistics list platform_event -n <namespace>

# Delete
xcsh statistics delete platform_event <name> -n <namespace>
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
