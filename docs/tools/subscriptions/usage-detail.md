---
page_title: f5xc_usage_detail - f5xc-api-mcp
subcategory: Subscriptions
description: List usage details
---

# Usage Detail

List usage details per tenant and namespace. Some usage have only sense in the system namespace and
this selector has no effect on it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-usage-detail-create` | List usage details |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Usage Detail resources:

### Create Usage Detail

> "Create a usage-detail named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f usage_detail.yaml

# Get
f5xcctl get usage_detail {name} -n {namespace}

# List
f5xcctl get usage_details -n {namespace}

# Delete
f5xcctl delete usage_detail {name} -n {namespace}
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
