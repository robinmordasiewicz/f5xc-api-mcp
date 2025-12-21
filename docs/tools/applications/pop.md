---
page_title: f5xc_pop - f5xc-api-mcp
subcategory: Applications
description: Remove Override.
---

# Pop

Remove override for dynamic component for API endpoints discovered for this App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-pop-create` | Remove Override. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Pop resources:

### Create Pop

> "Create a pop named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl applications create pop -n <namespace> -i pop.yaml

# Get
f5xcctl applications get pop <name> -n <namespace>

# List
f5xcctl applications list pop -n <namespace>

# Delete
f5xcctl applications delete pop <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_pop" "example" {
  name      = "example-pop"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
