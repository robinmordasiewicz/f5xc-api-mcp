---
page_title: f5xc_usage_detail - f5xc-api-mcp
subcategory: Billing And Usage
description: List usage details.
---

# Usage Detail

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List usage details per tenant and namespace. Some usage have only sense in the system namespace and
this selector has no effect on it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-usage-detail-create` | List usage details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- usage-detail

## Example Usage

Ask Claude to help you work with Usage Detail resources:

### Create Usage Detail

> "Create a usage-detail named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh billing_and_usage create usage_detail -n <namespace> -i usage_detail.yaml

# Get
xcsh billing_and_usage get usage_detail <name> -n <namespace>

# List
xcsh billing_and_usage list usage_detail -n <namespace>

# Delete
xcsh billing_and_usage delete usage_detail <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_usage_detail" "example" {
  name      = "example-usage-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
