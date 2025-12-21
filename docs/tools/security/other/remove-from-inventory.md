---
page_title: f5xc_remove_from_inventory - f5xc-api-mcp
subcategory: Security
description: Remove From API Inventory.
---

# Remove From Inventory

Update the API Definition's exclude list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-remove-from-inventory-create` | Remove From API Inventory. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Remove From Inventory resources:

### Create Remove From Inventory

> "Create a remove-from-inventory named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create remove_from_inventory -n <namespace> -i remove_from_inventory.yaml

# Get
f5xcctl security get remove_from_inventory <name> -n <namespace>

# List
f5xcctl security list remove_from_inventory -n <namespace>

# Delete
f5xcctl security delete remove_from_inventory <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_remove_from_inventory" "example" {
  name      = "example-remove-from-inventory"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
