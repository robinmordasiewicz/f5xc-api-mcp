---
page_title: f5xc_swap_primary - f5xc-api-mcp
subcategory: Billing
description: Make payment method secondary.
---

# Swap Primary

Swaps payment method roles - the payment method used as a parameter will became primary, any other
will become secondary. The `name` parameter is ignored.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-swap-primary-create` | Make payment method secondary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Swap Primary resources:

### Create Swap Primary

> "Create a swap-primary named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing create swap_primary -n <namespace> -i swap_primary.yaml

# Get
f5xcctl billing get swap_primary <name> -n <namespace>

# List
f5xcctl billing list swap_primary -n <namespace>

# Delete
f5xcctl billing delete swap_primary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_swap_primary" "example" {
  name      = "example-swap-primary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
