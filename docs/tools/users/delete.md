---
page_title: f5xc_delete - f5xc-api-mcp
subcategory: Users
description: DELETE
---

# Delete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DELETE will DELETE a given label label key = label value from current tenants shared namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-delete-create` | DELETE |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- delete

## Example Usage

Ask Claude to help you work with Delete resources:

### Create Delete

> "Create a delete named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deletes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deletes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deletes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @delete.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deletes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
