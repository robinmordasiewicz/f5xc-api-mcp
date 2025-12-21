---
page_title: f5xc_init - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Enable Client-Side Defense.
---

# Init

Enable Client-Side Defense feature for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-init-create` | Enable Client-Side Defense. |

## Example Usage

Ask Claude to help you work with Init resources:

### Create Init

> "Create a init named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create init -n <namespace> -i init.yaml

# Get
f5xcctl configuration get init -n <namespace> <name>

# List
f5xcctl configuration list init -n <namespace>

# Delete
f5xcctl configuration delete init -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_init" "example" {
  name      = "example-init"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
