---
page_title: f5xc_to - f5xc-api-mcp
subcategory: Organization
description: Get TOS
---

# To

Get TOS provides TOS version with text

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-to-list` | Get TOS |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with To resources:

### List Tos

> "List all tos in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create to -n <namespace> -i to.yaml

# Get
f5xcctl configuration get to -n <namespace> <name>

# List
f5xcctl configuration list to -n <namespace>

# Delete
f5xcctl configuration delete to -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_to" "example" {
  name      = "example-to"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
