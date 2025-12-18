---
page_title: f5xc_application_inventory - f5xc-api-mcp
subcategory: Applications
description: Application Objects Inventory
---

# Application Inventory

ApplicationInventory returns inventory of configured application related objects for the
tenant.
Inventory of namespaced objects (HTTP LBs, TCP LBs, etc) in a particular namespace is
returned.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-application-inventory-create` | Application Objects Inventory |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Application Inventory resources:

### Create Application Inventory

> "Create a application-inventory named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f application_inventory.yaml

# Get
f5xcctl get application_inventory {name} -n {namespace}

# List
f5xcctl get application_inventorys -n {namespace}

# Delete
f5xcctl delete application_inventory {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_application_inventory" "example" {
  name      = "example-application-inventory"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
