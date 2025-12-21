---
page_title: f5xc_enable - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Enable Application Traffic Insights.
---

# Enable

Enable Application Traffic Insights feature for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-enable-create` | Enable Application Traffic Insights. |

## Example Usage

Ask Claude to help you work with Enable resources:

### Create Enable

> "Create a enable named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create enable -n <namespace> -i enable.yaml

# Get
f5xcctl shape_security get enable <name> -n <namespace>

# List
f5xcctl shape_security list enable -n <namespace>

# Delete
f5xcctl shape_security delete enable <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enable" "example" {
  name      = "example-enable"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
