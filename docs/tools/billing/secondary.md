---
page_title: f5xc_secondary - f5xc-api-mcp
subcategory: Billing
description: Make payment method secondary.
---

# Secondary

Flags a payment method as secondary. Nothing changes is the payment method is already secondary, if
the payment method is primary then it becomes secondary and there will be no primary.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-secondary-create` | Make payment method secondary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Secondary resources:

### Create Secondary

> "Create a secondary named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing create secondary -n <namespace> -i secondary.yaml

# Get
f5xcctl billing get secondary <name> -n <namespace>

# List
f5xcctl billing list secondary -n <namespace>

# Delete
f5xcctl billing delete secondary <name> -n <namespace>
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
