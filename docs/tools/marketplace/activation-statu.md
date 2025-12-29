---
page_title: f5xc_activation_statu - f5xc-api-mcp
subcategory: Marketplace
description: Addon Service Activation Status.
---

# Activation Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET current subscription status for an addon service. Response can indicate whether the service was
successfully subscribed or in pending state.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-activation-statu-list` | Addon Service Activation Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `addon_service` | Addon_service | `Addon-service-1.` |

## Example Usage

Ask Claude to help you work with Activation Statu resources:

### List Activation Status

> "List all activation-status in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web activation-statu list --namespace {namespace}
```

List all activation-status

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create activation_statu -n <namespace> -i activation_statu.yaml

# Get
f5xcctl marketplace get activation_statu <name> -n <namespace>

# List
f5xcctl marketplace list activation_statu -n <namespace>

# Delete
f5xcctl marketplace delete activation_statu <name> -n <namespace>
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
