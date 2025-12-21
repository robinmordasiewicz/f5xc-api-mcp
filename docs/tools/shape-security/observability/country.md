---
page_title: f5xc_country - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Devices By Country.
---

# Country

GET devices country information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-country-create` | GET Devices By Country. |

## Example Usage

Ask Claude to help you work with Country resources:

### Create Country

> "Create a country named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create country -n <namespace> -i country.yaml

# Get
f5xcctl shape_security get country <name> -n <namespace>

# List
f5xcctl shape_security list country -n <namespace>

# Delete
f5xcctl shape_security delete country <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_country" "example" {
  name      = "example-country"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
