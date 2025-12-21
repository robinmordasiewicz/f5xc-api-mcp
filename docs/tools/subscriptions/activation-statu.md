---
page_title: f5xc_activation_statu - f5xc-api-mcp
subcategory: Subscriptions
description: Addon Service Activation Status.
---

# Activation Statu

GET current subscription status for an addon service. Response can indicate whether the service was
successfully subscribed or in pending state.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-activation-statu-list` | Addon Service Activation Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `addon_service` | Addon_service |

## Example Usage

Ask Claude to help you work with Activation Statu resources:

### List Activation Status

> "List all activation-status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl subscriptions create activation_statu -n <namespace> -i activation_statu.yaml

# Get
f5xcctl subscriptions get activation_statu <name> -n <namespace>

# List
f5xcctl subscriptions list activation_statu -n <namespace>

# Delete
f5xcctl subscriptions delete activation_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_activation_statu" "example" {
  name      = "example-activation-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
