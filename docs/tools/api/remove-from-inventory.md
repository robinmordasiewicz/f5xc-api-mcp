---
page_title: f5xc_remove_from_inventory - f5xc-api-mcp
subcategory: API
description: Remove From API Inventory.
---

# Remove From Inventory

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update the API Definition's exclude list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-remove-from-inventory-create` | Remove From API Inventory. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- remove-from-inventory

## Example Usage

Ask Claude to help you work with Remove From Inventory resources:

### Create Remove From Inventory

> "Create a remove-from-inventory named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/remove_from_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/remove_from_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/remove_from_inventorys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @remove_from_inventory.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/remove_from_inventorys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
