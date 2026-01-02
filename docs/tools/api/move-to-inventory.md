---
page_title: f5xc_move_to_inventory - f5xc-api-mcp
subcategory: API
description: Move To API Inventory.
---

# Move To Inventory

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update the API Definition's include list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-move-to-inventory-create` | Move To API Inventory. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- move-to-inventory

## Example Usage

Ask Claude to help you work with Move To Inventory resources:

### Create Move To Inventory

> "Create a move-to-inventory named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create move_to_inventory -n <namespace> -i move_to_inventory.yaml

# Get
xcsh api get move_to_inventory <name> -n <namespace>

# List
xcsh api list move_to_inventory -n <namespace>

# Delete
xcsh api delete move_to_inventory <name> -n <namespace>
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
