---
page_title: f5xc_subscription_statu - f5xc-api-mcp
subcategory: Observability
description: Check subscription status for Flow Collection.
---

# Subscription Statu

Check subscription status flow Flow Collection.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-subscription-statu-list` | Check subscription status for Flow Collection. |

## Example Usage

Ask Claude to help you work with Subscription Statu resources:

### List Subscription Status

> "List all subscription-status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create subscription_statu -n <namespace> -i subscription_statu.yaml

# Get
f5xcctl configuration get subscription_statu -n <namespace> <name>

# List
f5xcctl configuration list subscription_statu -n <namespace>

# Delete
f5xcctl configuration delete subscription_statu -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_subscription_statu" "example" {
  name      = "example-subscription-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
