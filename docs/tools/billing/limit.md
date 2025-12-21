---
page_title: f5xc_limit - f5xc-api-mcp
subcategory: Billing
description: Custom GET Quota Limits.
---

# Limit

Custom endpoint to return quota limits.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-limit-list` | Custom GET Quota Limits. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Limit resources:

### List Limits

> "List all limits in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing create limit -n <namespace> -i limit.yaml

# Get
f5xcctl billing get limit <name> -n <namespace>

# List
f5xcctl billing list limit -n <namespace>

# Delete
f5xcctl billing delete limit <name> -n <namespace>
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
