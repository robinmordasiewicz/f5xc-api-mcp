---
page_title: f5xc_monthly_usage - f5xc-api-mcp
subcategory: Billing And Usage
description: List monthly usage details.
---

# Monthly Usage

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List monthly usage details per tenant and namespace. Some usage have only sense in the system
namespace and this selector has no effect on it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-monthly-usage-create` | List monthly usage details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- monthly-usage

## Example Usage

Ask Claude to help you work with Monthly Usage resources:

### Create Monthly Usage

> "Create a monthly-usage named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh billing_and_usage create monthly_usage -n <namespace> -i monthly_usage.yaml

# Get
xcsh billing_and_usage get monthly_usage <name> -n <namespace>

# List
xcsh billing_and_usage list monthly_usage -n <namespace>

# Delete
xcsh billing_and_usage delete monthly_usage <name> -n <namespace>
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
