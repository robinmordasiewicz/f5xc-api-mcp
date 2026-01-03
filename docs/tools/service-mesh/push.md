---
page_title: f5xc_push - f5xc-api-mcp
subcategory: Service Mesh
description: Add Override.
---

# Push

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Add override for dynamic component for API endpoints discovered for this App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-push-create` | Add Override. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- push

## Example Usage

Ask Claude to help you work with Push resources:

### Create Push

> "Create a push named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pushs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pushs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pushs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @push.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pushs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
