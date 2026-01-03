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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventory_waf_filters" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventory_waf_filters/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventory_waf_filters" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @all_application_inventory_waf_filter.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventory_waf_filters/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
