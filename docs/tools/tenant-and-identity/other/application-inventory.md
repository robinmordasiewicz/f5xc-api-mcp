---
page_title: f5xc_application_inventory - f5xc-api-mcp
subcategory: Tenant And Identity
description: Application Objects Inventory.
---

# Application Inventory

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

ApplicationInventory returns inventory of configured application related objects for the
tenant.
Inventory of namespaced objects (HTTP LBs, TCP LBs, etc) in a particular namespace is
returned.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-application-inventory-create` | Application Objects Inventory. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- application-inventory

## Example Usage

Ask Claude to help you work with Application Inventory resources:

### Create Application Inventory

> "Create a application-inventory named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create application_inventory -n <namespace> -i application_inventory.yaml

# Get
xcsh tenant_and_identity get application_inventory <name> -n <namespace>

# List
xcsh tenant_and_identity list application_inventory -n <namespace>

# Delete
xcsh tenant_and_identity delete application_inventory <name> -n <namespace>
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
