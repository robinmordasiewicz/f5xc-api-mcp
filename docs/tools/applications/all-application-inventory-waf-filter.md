---
page_title: f5xc_all_application_inventory_waf_filter - f5xc-api-mcp
subcategory: Applications
description: All Application Objects Inventory with WAF Filters
---

# All Application Inventory WAF Filter

AllApplicationInventoryWaf returns inventory of configured application related objects for all
namespaces with WAF Filters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-all-application-inventory-waf-filter-create` | All Application Objects Inventory with WAF Filters |

## Example Usage

Ask Claude to help you work with All Application Inventory WAF Filter resources:

### Create All Application Inventory WAF Filter

> "Create a all-application-inventory-waf-filter named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create all_application_inventory_waf_filter -n <namespace> -i all_application_inventory_waf_filter.yaml

# Get
f5xcctl configuration get all_application_inventory_waf_filter -n <namespace> <name>

# List
f5xcctl configuration list all_application_inventory_waf_filter -n <namespace>

# Delete
f5xcctl configuration delete all_application_inventory_waf_filter -n <namespace> <name>
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
