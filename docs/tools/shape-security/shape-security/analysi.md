---
page_title: f5xc_analysi - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Update FormField Analysis.
---

# Analysi

Mark / unmark field sensitivity by customer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-analysi-create` | Update FormField Analysis. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Analysi resources:

### Create Analysi

> "Create a analysi named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create analysi -n <namespace> -i analysi.yaml

# Get
f5xcctl configuration get analysi -n <namespace> <name>

# List
f5xcctl configuration list analysi -n <namespace>

# Delete
f5xcctl configuration delete analysi -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_analysi" "example" {
  name      = "example-analysi"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
