---
page_title: f5xc_Schema - f5xc-api-mcp
subcategory: Tenant And Identity
description: Schemas By ID.
---

# Schema

!!! info "Low Risk"
    Operations on this resource are generally safe.

Getschemabyid CustomPublicAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-schema-get` | Schemas By ID. |
| `f5xc-api-tenantandidentity-schema-list` | Schemas |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `sam.smith@gmail.com.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `excludedAttributes` | Members"]" | `[` |

## Example Usage

Ask Claude to help you work with Schema resources:

### List Schemas

> "List all Schemas in the 'production' namespace"

### Get Schema Details

> "Get details of the Schema named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/Schemas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/Schemas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/Schemas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @Schema.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/Schemas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
