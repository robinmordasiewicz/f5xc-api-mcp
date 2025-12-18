---
page_title: f5xc_subscription_statu - f5xc-api-mcp
subcategory: Subscriptions
description: Check subscription status for Flow Collection
---

# Subscription Statu

Check subscription status flow Flow Collection

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-subscription-statu-list` | Check subscription status for Flow Collection |

## Example Usage

Ask Claude to help you work with Subscription Statu resources:

### List Subscription Status

> "List all subscription-status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f subscription_statu.yaml

# Get
f5xcctl get subscription_statu {name} -n {namespace}

# List
f5xcctl get subscription_status -n {namespace}

# Delete
f5xcctl delete subscription_statu {name} -n {namespace}
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
