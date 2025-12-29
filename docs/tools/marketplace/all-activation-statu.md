---
page_title: f5xc_all_activation_statu - f5xc-api-mcp
subcategory: Marketplace
description: All Addon Service Activation Status.
---

# All Activation Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET current subscription status for all addon services in a feature tier. Response can indicate
whether the service was successfully subscribed or in pending state.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-all-activation-statu-list` | All Addon Service Activation Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `addon_service` | Addon_service | `Addon-service-1.` |

## Example Usage

Ask Claude to help you work with All Activation Statu resources:

### List All Activation Status

> "List all all-activation-status in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web all-activation-statu list --namespace {namespace}
```

List all all-activation-status

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create all_activation_statu -n <namespace> -i all_activation_statu.yaml

# Get
f5xcctl marketplace get all_activation_statu <name> -n <namespace>

# List
f5xcctl marketplace list all_activation_statu -n <namespace>

# Delete
f5xcctl marketplace delete all_activation_statu <name> -n <namespace>
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
