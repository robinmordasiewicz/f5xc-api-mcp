---
page_title: f5xc_current_usage - f5xc-api-mcp
subcategory: Organization
description: List current usage details
---

# Current Usage

List current usage details per tenant and namespace. Some usage have only sense in the system
namespace and this selector has no effect on it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-current-usage-create` | List current usage details |

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
f5xcctl apply -f current_usage.yaml

# Get
f5xcctl get current_usage {name} -n {namespace}

# List
f5xcctl get current_usages -n {namespace}

# Delete
f5xcctl delete current_usage {name} -n {namespace}
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
