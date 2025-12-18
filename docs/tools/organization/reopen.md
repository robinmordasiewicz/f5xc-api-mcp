---
page_title: f5xc_reopen - f5xc-api-mcp
subcategory: Organization
description: Reopen a closed customer support ticket in child tenant
---

# Reopen

Reopens a selected closed customer support ticket.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-reopen-create` | Reopen a closed customer support ticket in child tenant |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `tp_id` | Third party ID |

## Example Usage

Ask Claude to help you work with Reopen resources:

### Create Reopen

> "Create a reopen named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f reopen.yaml

# Get
f5xcctl get reopen {name} -n {namespace}

# List
f5xcctl get reopens -n {namespace}

# Delete
f5xcctl delete reopen {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_reopen" "example" {
  name      = "example-reopen"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
