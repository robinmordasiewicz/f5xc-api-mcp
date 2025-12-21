---
page_title: f5xc_priority - f5xc-api-mcp
subcategory: Operations
description: Change priority of a ticket.
---

# Priority

Changes priority of a selected ticket. Not possible if ticket's already closed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-priority-create` | Change priority of a ticket. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Priority resources:

### Create Priority

> "Create a priority named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create priority -n <namespace> -i priority.yaml

# Get
f5xcctl operations get priority <name> -n <namespace>

# List
f5xcctl operations list priority -n <namespace>

# Delete
f5xcctl operations delete priority <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_priority" "example" {
  name      = "example-priority"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
