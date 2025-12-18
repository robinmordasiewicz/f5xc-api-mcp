---
page_title: f5xc_all_application_inventory - f5xc-api-mcp
subcategory: Applications
description: All Application Objects Inventory
---

# All Application Inventory

AllApplicationInventory returns inventory of configured application related objects for all
namespaces.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-all-application-inventory-create` | All Application Objects Inventory |

## Example Usage

Ask Claude to help you work with All Application Inventory resources:

### Create All Application Inventory

> "Create a all-application-inventory named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f all_application_inventory.yaml

# Get
f5xcctl get all_application_inventory {name} -n {namespace}

# List
f5xcctl get all_application_inventorys -n {namespace}

# Delete
f5xcctl delete all_application_inventory {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_all_application_inventory" "example" {
  name      = "example-all-application-inventory"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
