---
page_title: f5xc_force_delete - f5xc-api-mcp
subcategory: Service Mesh
description: Force DELETE NFV Service.
---

# Force Delete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Force DELETE NFV Service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-force-delete-create` | Force DELETE NFV Service. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Nfv-service-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- force-delete

## Example Usage

Ask Claude to help you work with Force Delete resources:

### Create Force Delete

> "Create a force-delete named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/force_deletes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/force_deletes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/force_deletes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @force_delete.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/force_deletes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
