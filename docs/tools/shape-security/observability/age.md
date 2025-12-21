---
page_title: f5xc_age - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Devices By Age.
---

# Age

GET device age information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-age-create` | GET Devices By Age. |

## Example Usage

Ask Claude to help you work with Age resources:

### Create Age

> "Create a age named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create age -n <namespace> -i age.yaml

# Get
f5xcctl shape_security get age <name> -n <namespace>

# List
f5xcctl shape_security list age -n <namespace>

# Delete
f5xcctl shape_security delete age <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_age" "example" {
  name      = "example-age"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
