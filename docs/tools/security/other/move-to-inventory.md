---
page_title: f5xc_move_to_inventory - f5xc-api-mcp
subcategory: Security
description: Move To API Inventory.
---

# Move To Inventory

Update the API Definition's include list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-move-to-inventory-create` | Move To API Inventory. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Move To Inventory resources:

### Create Move To Inventory

> "Create a move-to-inventory named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create move_to_inventory -n <namespace> -i move_to_inventory.yaml

# Get
f5xcctl configuration get move_to_inventory -n <namespace> <name>

# List
f5xcctl configuration list move_to_inventory -n <namespace>

# Delete
f5xcctl configuration delete move_to_inventory -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_move_to_inventory" "example" {
  name      = "example-move-to-inventory"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
