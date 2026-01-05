---
page_title: f5xc_learnt_schema - f5xc-api-mcp
subcategory: Service Mesh
description: GET Learnt Schema per API endpoint.
---

# Learnt Schema

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Learnt Schema per API endpoint for a given auto discovered API endpoint for Service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-learnt-schema-create` | GET Learnt Schema per API endpoint. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- learnt-schema

## Example Usage

Ask Claude to help you work with Learnt Schema resources:

### Create Learnt Schema

> "Create a learnt-schema named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/learnt_schemas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/learnt_schemas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/learnt_schemas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @learnt_schema.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/learnt_schemas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
