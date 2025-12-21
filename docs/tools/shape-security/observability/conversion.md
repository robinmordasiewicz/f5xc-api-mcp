---
page_title: f5xc_conversion - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Conversion Dashboard.
---

# Conversion

GET conversion chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-conversion-create` | Conversion Dashboard. |

## Example Usage

Ask Claude to help you work with Conversion resources:

### Create Conversion

> "Create a conversion named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create conversion -n <namespace> -i conversion.yaml

# Get
f5xcctl shape_security get conversion <name> -n <namespace>

# List
f5xcctl shape_security list conversion -n <namespace>

# Delete
f5xcctl shape_security delete conversion <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_conversion" "example" {
  name      = "example-conversion"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
