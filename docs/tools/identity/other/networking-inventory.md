---
page_title: f5xc_networking_inventory - f5xc-api-mcp
subcategory: Identity
description: Networking Objects Inventory.
---

# Networking Inventory

NetworkingInventory returns inventory of configured networking related objects for the
tenant.
Inventory of system-wide objects (global networks, sites, site mesh groups, etc) is
returned.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-networking-inventory-create` | Networking Objects Inventory. |

## Example Usage

Ask Claude to help you work with Networking Inventory resources:

### Create Networking Inventory

> "Create a networking-inventory named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create networking_inventory -n <namespace> -i networking_inventory.yaml

# Get
f5xcctl identity get networking_inventory <name> -n <namespace>

# List
f5xcctl identity list networking_inventory -n <namespace>

# Delete
f5xcctl identity delete networking_inventory <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_networking_inventory" "example" {
  name      = "example-networking-inventory"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
