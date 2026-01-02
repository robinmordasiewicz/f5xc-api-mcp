---
page_title: f5xc_payment_method - f5xc-api-mcp
subcategory: Billing And Usage
description: Create payment method specification.
---

# Payment Method

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a new payment method with a specific role.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-payment-method-create` | Create payment method specification. |
| `f5xc-api-billingandusage-payment-method-delete` | DELETE the specified payment method. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `name` | Name | `Payment-method-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- payment-method

**Deletes:**

- payment-method
- contained_resources

## Example Usage

Ask Claude to help you work with Payment Method resources:

### Create Payment Method

> "Create a payment-method named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh billing_and_usage create payment_method -n <namespace> -i payment_method.yaml

# Get
xcsh billing_and_usage get payment_method <name> -n <namespace>

# List
xcsh billing_and_usage list payment_method -n <namespace>

# Delete
xcsh billing_and_usage delete payment_method <name> -n <namespace>
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
