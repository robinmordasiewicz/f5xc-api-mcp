---
page_title: f5xc_ua - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Devices By User-Agent.
---

# Ua

GET devices user agent information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-ua-create` | GET Devices By User-Agent. |

## Example Usage

Ask Claude to help you work with Ua resources:

### Create Ua

> "Create a ua named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create ua -n <namespace> -i ua.yaml

# Get
f5xcctl shape_security get ua <name> -n <namespace>

# List
f5xcctl shape_security list ua -n <namespace>

# Delete
f5xcctl shape_security delete ua <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ua" "example" {
  name      = "example-ua"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
