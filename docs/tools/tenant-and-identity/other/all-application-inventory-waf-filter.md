---
page_title: f5xc_all_application_inventory_waf_filter - f5xc-api-mcp
subcategory: Tenant And Identity
description: All Application Objects Inventory with WAF Filters.
---

# All Application Inventory WAF Filter

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AllApplicationInventoryWaf returns inventory of configured application related objects for all
namespaces with WAF Filters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-all-application-inventory-waf-filter-create` | All Application Objects Inventory with WAF Filters. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- all-application-inventory-waf-filter

## Example Usage

Ask Claude to help you work with All Application Inventory WAF Filter resources:

### Create All Application Inventory WAF Filter

> "Create a all-application-inventory-waf-filter named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create all_application_inventory_waf_filter -n <namespace> -i all_application_inventory_waf_filter.yaml

# Get
xcsh tenant_and_identity get all_application_inventory_waf_filter <name> -n <namespace>

# List
xcsh tenant_and_identity list all_application_inventory_waf_filter -n <namespace>

# Delete
xcsh tenant_and_identity delete all_application_inventory_waf_filter <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_all_application_inventory_waf_filter" "example" {
  name      = "example-all-application-inventory-waf-filter"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
