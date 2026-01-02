---
page_title: f5xc_all_application_inventory - f5xc-api-mcp
subcategory: Tenant And Identity
description: All Application Objects Inventory.
---

# All Application Inventory

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AllApplicationInventory returns inventory of configured application related objects for all
namespaces.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-all-application-inventory-create` | All Application Objects Inventory. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- all-application-inventory

## Example Usage

Ask Claude to help you work with All Application Inventory resources:

### Create All Application Inventory

> "Create a all-application-inventory named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create all_application_inventory -n <namespace> -i all_application_inventory.yaml

# Get
xcsh tenant_and_identity get all_application_inventory <name> -n <namespace>

# List
xcsh tenant_and_identity list all_application_inventory -n <namespace>

# Delete
xcsh tenant_and_identity delete all_application_inventory <name> -n <namespace>
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
