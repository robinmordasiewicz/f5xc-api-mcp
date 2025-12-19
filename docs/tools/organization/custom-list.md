---
page_title: f5xc_custom_list - f5xc-api-mcp
subcategory: Organization
description: List invoices
---

# Custom List

Endpoint to list customer invoices

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-custom-list-list` | List invoices |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `limit` | The limit parameter |

## Example Usage

Ask Claude to help you work with Custom List resources:

### List Custom Lists

> "List all custom-lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create custom_list -n <namespace> -i custom_list.yaml

# Get
f5xcctl configuration get custom_list -n <namespace> <name>

# List
f5xcctl configuration list custom_list -n <namespace>

# Delete
f5xcctl configuration delete custom_list -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_custom_list" "example" {
  name      = "example-custom-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
