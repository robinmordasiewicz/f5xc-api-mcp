---
page_title: f5xc_payment_method - f5xc-api-mcp
subcategory: Subscriptions
description: Create payment method specification
---

# Payment Method

Creates a new payment method with a specific role.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-payment-method-create` | Create payment method specification |
| `f5xc-api-core-payment-method-delete` | Delete the specified payment method |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `name` | Name |

## Example Usage

Ask Claude to help you work with Payment Method resources:

### Create Payment Method

> "Create a payment-method named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create payment_method -n <namespace> -i payment_method.yaml

# Get
f5xcctl configuration get payment_method -n <namespace> <name>

# List
f5xcctl configuration list payment_method -n <namespace>

# Delete
f5xcctl configuration delete payment_method -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_payment_method" "example" {
  name      = "example-payment-method"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
