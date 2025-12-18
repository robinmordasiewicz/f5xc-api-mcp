---
page_title: f5xc_move_to_inventory - f5xc-api-mcp
subcategory: Organization
description: Move To API Inventory
---

# Move To Inventory

Update the API Definition's include list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-move-to-inventory-create` | Move To API Inventory |

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
f5xcctl apply -f move_to_inventory.yaml

# Get
f5xcctl get move_to_inventory {name} -n {namespace}

# List
f5xcctl get move_to_inventorys -n {namespace}

# Delete
f5xcctl delete move_to_inventory {name} -n {namespace}
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
