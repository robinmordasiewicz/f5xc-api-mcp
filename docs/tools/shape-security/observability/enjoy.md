---
page_title: f5xc_enjoy - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Enjoy Dashboard.
---

# Enjoy

GET enjoy chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-enjoy-create` | Enjoy Dashboard. |

## Example Usage

Ask Claude to help you work with Enjoy resources:

### Create Enjoy

> "Create a enjoy named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create enjoy -n <namespace> -i enjoy.yaml

# Get
f5xcctl configuration get enjoy -n <namespace> <name>

# List
f5xcctl configuration list enjoy -n <namespace>

# Delete
f5xcctl configuration delete enjoy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_enjoy" "example" {
  name      = "example-enjoy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
