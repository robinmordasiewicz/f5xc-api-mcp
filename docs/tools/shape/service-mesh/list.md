---
page_title: f5xc_list - f5xc-api-mcp
subcategory: Shape
description: All Protected Endpoints.
---

# List

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET All Protected Endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-list-create` | All Protected Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list

## Example Usage

Ask Claude to help you work with List resources:

### Create List

> "Create a list named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lists" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lists/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lists" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @list.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lists/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
