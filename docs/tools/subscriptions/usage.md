---
page_title: f5xc_usage - f5xc-api-mcp
subcategory: Subscriptions
description: Get Quota Usage
---

# Usage

Get allows users to query limits and current usage of resources.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-usage-list` | Get Quota Usage |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Usage resources:

### List Usages

> "List all usages in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create usage -n <namespace> -i usage.yaml

# Get
f5xcctl configuration get usage -n <namespace> <name>

# List
f5xcctl configuration list usage -n <namespace>

# Delete
f5xcctl configuration delete usage -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_usage" "example" {
  name      = "example-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
