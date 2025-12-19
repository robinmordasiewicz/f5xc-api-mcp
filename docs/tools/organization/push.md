---
page_title: f5xc_push - f5xc-api-mcp
subcategory: Organization
description: Add Override
---

# Push

Add override for dynamic component for API endpoints discovered for this App type

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-push-create` | Add Override |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Push resources:

### Create Push

> "Create a push named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create push -n <namespace> -i push.yaml

# Get
f5xcctl configuration get push -n <namespace> <name>

# List
f5xcctl configuration list push -n <namespace>

# Delete
f5xcctl configuration delete push -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_push" "example" {
  name      = "example-push"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
