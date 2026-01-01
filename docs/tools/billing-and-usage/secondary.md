---
page_title: f5xc_secondary - f5xc-api-mcp
subcategory: Billing And Usage
description: Make payment method secondary.
---

# Secondary

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Flags a payment method as secondary. Nothing changes is the payment method is already secondary, if
the payment method is primary then it becomes secondary and there will be no primary.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-secondary-create` | Make payment method secondary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Payment-method-1.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- secondary

## Example Usage

Ask Claude to help you work with Secondary resources:

### Create Secondary

> "Create a secondary named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh billing_and_usage create secondary -n <namespace> -i secondary.yaml

# Get
xcsh billing_and_usage get secondary <name> -n <namespace>

# List
xcsh billing_and_usage list secondary -n <namespace>

# Delete
xcsh billing_and_usage delete secondary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_secondary" "example" {
  name      = "example-secondary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
