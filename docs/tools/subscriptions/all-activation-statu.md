---
page_title: f5xc_all_activation_statu - f5xc-api-mcp
subcategory: Subscriptions
description: All Addon Service Activation Status.
---

# All Activation Statu

GET current subscription status for all addon services in a feature tier. Response can indicate
whether the service was successfully subscribed or in pending state.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-all-activation-statu-list` | All Addon Service Activation Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `addon_service` | Addon_service |

## Example Usage

Ask Claude to help you work with All Activation Statu resources:

### List All Activation Status

> "List all all-activation-status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create all_activation_statu -n <namespace> -i all_activation_statu.yaml

# Get
f5xcctl configuration get all_activation_statu -n <namespace> <name>

# List
f5xcctl configuration list all_activation_statu -n <namespace>

# Delete
f5xcctl configuration delete all_activation_statu -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_all_activation_statu" "example" {
  name      = "example-all-activation-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
