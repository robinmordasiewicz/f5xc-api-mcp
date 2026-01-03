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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @all_application_inventory.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_application_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
