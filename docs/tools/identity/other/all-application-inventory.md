---
page_title: f5xc_all_application_inventory - f5xc-api-mcp
subcategory: Identity
description: All Application Objects Inventory.
---

# All Application Inventory

AllApplicationInventory returns inventory of configured application related objects for all
namespaces.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-all-application-inventory-create` | All Application Objects Inventory. |

## Example Usage

Ask Claude to help you work with All Application Inventory resources:

### Create All Application Inventory

> "Create a all-application-inventory named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create all_application_inventory -n <namespace> -i all_application_inventory.yaml

# Get
f5xcctl configuration get all_application_inventory -n <namespace> <name>

# List
f5xcctl configuration list all_application_inventory -n <namespace>

# Delete
f5xcctl configuration delete all_application_inventory -n <namespace> <name>
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
