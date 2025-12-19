---
page_title: f5xc_enable_feature - f5xc-api-mcp
subcategory: Organization
description: Enable feature
---

# Enable Feature

Enable service by returning service account details

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-enable-feature-create` | Enable feature |

## Example Usage

Ask Claude to help you work with Enable Feature resources:

### Create Enable Feature

> "Create a enable-feature named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create enable_feature -n <namespace> -i enable_feature.yaml

# Get
f5xcctl configuration get enable_feature -n <namespace> <name>

# List
f5xcctl configuration list enable_feature -n <namespace>

# Delete
f5xcctl configuration delete enable_feature -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_enable_feature" "example" {
  name      = "example-enable-feature"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
