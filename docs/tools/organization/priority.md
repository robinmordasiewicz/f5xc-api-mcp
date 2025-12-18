---
page_title: f5xc_priority - f5xc-api-mcp
subcategory: Organization
description: Change priority of a ticket in child tenant
---

# Priority

Changes priority of a selected ticket. Not possible if ticket's already closed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-priority-create` | Change priority of a ticket in child tenant |

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
f5xcctl apply -f priority.yaml

# Get
f5xcctl get priority {name} -n {namespace}

# List
f5xcctl get prioritys -n {namespace}

# Delete
f5xcctl delete priority {name} -n {namespace}
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
