---
page_title: f5xc_remove_from_inventory - f5xc-api-mcp
subcategory: API
description: Remove From API Inventory.
---

# Remove From Inventory

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update the API Definition's exclude list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-remove-from-inventory-create` | Remove From API Inventory. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- remove-from-inventory

## Example Usage

Ask Claude to help you work with Remove From Inventory resources:

### Create Remove From Inventory

> "Create a remove-from-inventory named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create remove_from_inventory -n <namespace> -i remove_from_inventory.yaml

# Get
xcsh api get remove_from_inventory <name> -n <namespace>

# List
xcsh api list remove_from_inventory -n <namespace>

# Delete
xcsh api delete remove_from_inventory <name> -n <namespace>
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
