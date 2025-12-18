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
f5xcctl apply -f limit.yaml

# Get
f5xcctl get limit {name} -n {namespace}

# List
f5xcctl get limits -n {namespace}

# Delete
f5xcctl delete limit {name} -n {namespace}
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
