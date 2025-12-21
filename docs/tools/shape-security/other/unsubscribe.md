---
page_title: f5xc_unsubscribe - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Unsubscribe to Client-Side Defense.
---

# Unsubscribe

Unsubscribe to Client-Side Defense.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-unsubscribe-create` | Unsubscribe to Client-Side Defense. |

## Example Usage

Ask Claude to help you work with Unsubscribe resources:

### Create Unsubscribe

> "Create a unsubscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create unsubscribe -n <namespace> -i unsubscribe.yaml

# Get
f5xcctl shape_security get unsubscribe <name> -n <namespace>

# List
f5xcctl shape_security list unsubscribe -n <namespace>

# Delete
f5xcctl shape_security delete unsubscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unsubscribe" "example" {
  name      = "example-unsubscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
