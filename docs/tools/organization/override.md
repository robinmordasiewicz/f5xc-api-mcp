---
page_title: f5xc_override - f5xc-api-mcp
subcategory: Organization
description: Get Override
---

# Override

Get all override for API endpoints configured for this App type

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-override-list` | Get Override |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Override resources:

### List Overrides

> "List all overrides in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create override -n <namespace> -i override.yaml

# Get
f5xcctl configuration get override -n <namespace> <name>

# List
f5xcctl configuration list override -n <namespace>

# Delete
f5xcctl configuration delete override -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_override" "example" {
  name      = "example-override"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
