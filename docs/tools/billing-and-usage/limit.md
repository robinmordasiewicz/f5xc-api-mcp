---
page_title: f5xc_limit - f5xc-api-mcp
subcategory: Billing And Usage
description: Custom GET Quota Limits.
---

# Limit

!!! info "Low Risk"
    Operations on this resource are generally safe.

Custom endpoint to return quota limits.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-limit-list` | Custom GET Quota Limits. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Limit resources:

### List Limits

> "List all limits in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh billing_and_usage create limit -n <namespace> -i limit.yaml

# Get
xcsh billing_and_usage get limit <name> -n <namespace>

# List
xcsh billing_and_usage list limit -n <namespace>

# Delete
xcsh billing_and_usage delete limit <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_limit" "example" {
  name      = "example-limit"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
