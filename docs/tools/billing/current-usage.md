---
page_title: f5xc_current_usage - f5xc-api-mcp
subcategory: Billing
description: List current usage details.
---

# Current Usage

List current usage details per tenant and namespace. Some usage have only sense in the system
namespace and this selector has no effect on it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-current-usage-create` | List current usage details. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Current Usage resources:

### Create Current Usage

> "Create a current-usage named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create current_usage -n <namespace> -i current_usage.yaml

# Get
f5xcctl configuration get current_usage -n <namespace> <name>

# List
f5xcctl configuration list current_usage -n <namespace>

# Delete
f5xcctl configuration delete current_usage -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_current_usage" "example" {
  name      = "example-current-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
