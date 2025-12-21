---
page_title: f5xc_priority - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Priority of a ticket in managed tenant.
---

# Priority

Priority of a selected ticket. Not possible if ticket's already closed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-priority-create` | Priority of a ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `tp_id` | Third party ID |

## Example Usage

Ask Claude to help you work with Priority resources:

### Create Priority

> "Create a priority named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create priority -n <namespace> -i priority.yaml

# Get
f5xcctl configuration get priority -n <namespace> <name>

# List
f5xcctl configuration list priority -n <namespace>

# Delete
f5xcctl configuration delete priority -n <namespace> <name>
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
