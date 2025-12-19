---
page_title: f5xc_networking_inventory - f5xc-api-mcp
subcategory: Organization
description: Networking Objects Inventory
---

# Networking Inventory

NetworkingInventory returns inventory of configured networking related objects for the
tenant.
Inventory of system-wide objects (global networks, sites, site mesh groups, etc) is
returned.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-networking-inventory-create` | Networking Objects Inventory |

## Example Usage

Ask Claude to help you work with Networking Inventory resources:

### Create Networking Inventory

> "Create a networking-inventory named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create networking_inventory -n <namespace> -i networking_inventory.yaml

# Get
f5xcctl configuration get networking_inventory -n <namespace> <name>

# List
f5xcctl configuration list networking_inventory -n <namespace>

# Delete
f5xcctl configuration delete networking_inventory -n <namespace> <name>
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
