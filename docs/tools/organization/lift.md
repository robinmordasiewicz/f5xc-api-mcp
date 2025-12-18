---
page_title: f5xc_lift - f5xc-api-mcp
subcategory: Organization
description: Lift Dashboard
---

# Lift

Get lift chart data from shape recognize api

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-lift-create` | Lift Dashboard |

## Example Usage

Ask Claude to help you work with Lift resources:

### Create Lift

> "Create a lift named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f lift.yaml

# Get
f5xcctl get lift {name} -n {namespace}

# List
f5xcctl get lifts -n {namespace}

# Delete
f5xcctl delete lift {name} -n {namespace}
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
