---
page_title: f5xc_networking_inventory - f5xc-api-mcp
subcategory: Tenant And Identity
description: Networking Objects Inventory.
---

# Networking Inventory

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

NetworkingInventory returns inventory of configured networking related objects for the
tenant.
Inventory of system-wide objects (global networks, sites, site mesh groups, etc) is
returned.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-networking-inventory-create` | Networking Objects Inventory. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- networking-inventory

## Example Usage

Ask Claude to help you work with Networking Inventory resources:

### Create Networking Inventory

> "Create a networking-inventory named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networking_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networking_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networking_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @networking_inventory.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networking_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
