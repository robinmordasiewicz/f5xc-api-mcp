---
page_title: f5xc_limit - f5xc-api-mcp
subcategory: Organization
description: Custom Get Quota Limits
---

# Limit

Custom endpoint to return quota limits

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-limit-list` | Custom Get Quota Limits |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Limit resources:

### List Limits

> "List all limits in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create limit -n <namespace> -i limit.yaml

# Get
f5xcctl configuration get limit -n <namespace> <name>

# List
f5xcctl configuration list limit -n <namespace>

# Delete
f5xcctl configuration delete limit -n <namespace> <name>
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
