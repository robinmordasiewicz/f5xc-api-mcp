---
page_title: f5xc_activation_statu - f5xc-api-mcp
subcategory: Organization
description: Addon Service Activation Status
---

# Activation Statu

Get current subscription status for an addon service. Response can indicate whether the service was
successfully subscribed or in pending state.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-activation-statu-list` | Addon Service Activation Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `addon_service` | addon_service |

## Example Usage

Ask Claude to help you work with Activation Statu resources:

### List Activation Status

> "List all activation-status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create activation_statu -n <namespace> -i activation_statu.yaml

# Get
f5xcctl configuration get activation_statu -n <namespace> <name>

# List
f5xcctl configuration list activation_statu -n <namespace>

# Delete
f5xcctl configuration delete activation_statu -n <namespace> <name>
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
