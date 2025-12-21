---
page_title: f5xc_monthly_usage - f5xc-api-mcp
subcategory: Billing
description: List monthly usage details.
---

# Monthly Usage

List monthly usage details per tenant and namespace. Some usage have only sense in the system
namespace and this selector has no effect on it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-monthly-usage-create` | List monthly usage details. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Monthly Usage resources:

### Create Monthly Usage

> "Create a monthly-usage named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create monthly_usage -n <namespace> -i monthly_usage.yaml

# Get
f5xcctl configuration get monthly_usage -n <namespace> <name>

# List
f5xcctl configuration list monthly_usage -n <namespace>

# Delete
f5xcctl configuration delete monthly_usage -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_monthly_usage" "example" {
  name      = "example-monthly-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
