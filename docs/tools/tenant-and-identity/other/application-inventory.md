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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/application_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/application_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/application_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @application_inventory.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/application_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
