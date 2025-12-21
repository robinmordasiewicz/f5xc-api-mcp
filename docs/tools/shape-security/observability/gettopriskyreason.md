---
page_title: f5xc_gettopriskyreason - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GetTopRiskyReasons.
---

# Gettopriskyreason

GET top risky reasons data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-gettopriskyreason-create` | GetTopRiskyReasons. |

## Example Usage

Ask Claude to help you work with Gettopriskyreason resources:

### Create Gettopriskyreason

> "Create a gettopriskyreason named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create gettopriskyreason -n <namespace> -i gettopriskyreason.yaml

# Get
f5xcctl shape_security get gettopriskyreason <name> -n <namespace>

# List
f5xcctl shape_security list gettopriskyreason -n <namespace>

# Delete
f5xcctl shape_security delete gettopriskyreason <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskyreason" "example" {
  name      = "example-gettopriskyreason"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
