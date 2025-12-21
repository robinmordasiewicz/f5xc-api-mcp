---
page_title: f5xc_info - f5xc-api-mcp
subcategory: Operations
description: Show LTE info.
---

# Info

GET LTE runtime information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-info-list` | Show LTE info. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Info resources:

### List Infos

> "List all infos in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create info -n <namespace> -i info.yaml

# Get
f5xcctl configuration get info -n <namespace> <name>

# List
f5xcctl configuration list info -n <namespace>

# Delete
f5xcctl configuration delete info -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_info" "example" {
  name      = "example-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
