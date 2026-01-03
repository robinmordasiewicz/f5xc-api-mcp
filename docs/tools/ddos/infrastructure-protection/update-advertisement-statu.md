---
page_title: f5xc_update_advertisement_statu - f5xc-api-mcp
subcategory: Ddos
description: Update Infraprotect Internet prefix advertisement.
---

# Update Advertisement Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Infraprotect Internet prefix advertisement.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-advertisement-statu-create` | Update Infraprotect Internet prefix advertisement. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-advertisement-statu

## Example Usage

Ask Claude to help you work with Update Advertisement Statu resources:

### Create Update Advertisement Statu

> "Create a update-advertisement-statu named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_advertisement_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_advertisement_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_advertisement_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @update_advertisement_statu.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_advertisement_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
