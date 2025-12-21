---
page_title: f5xc_rescue - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Rescue Dashboard.
---

# Rescue

GET rescue chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-rescue-create` | Rescue Dashboard. |

## Example Usage

Ask Claude to help you work with Rescue resources:

### Create Rescue

> "Create a rescue named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create rescue -n <namespace> -i rescue.yaml

# Get
f5xcctl configuration get rescue -n <namespace> <name>

# List
f5xcctl configuration list rescue -n <namespace>

# Delete
f5xcctl configuration delete rescue -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_rescue" "example" {
  name      = "example-rescue"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
