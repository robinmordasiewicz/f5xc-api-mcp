---
page_title: f5xc_lift - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Lift Dashboard.
---

# Lift

GET lift chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-lift-create` | Lift Dashboard. |

## Example Usage

Ask Claude to help you work with Lift resources:

### Create Lift

> "Create a lift named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create lift -n <namespace> -i lift.yaml

# Get
f5xcctl configuration get lift -n <namespace> <name>

# List
f5xcctl configuration list lift -n <namespace>

# Delete
f5xcctl configuration delete lift -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_lift" "example" {
  name      = "example-lift"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
