---
page_title: f5xc_mapper - f5xc-api-mcp
subcategory: Tenant And Identity
description: Update OIDC mappers.
---

# Mapper

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update OIDC mappers updates OIDC mappers in underlying IDM provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-mapper-create` | Update OIDC mappers. |
| `f5xc-api-tenantandidentity-mapper-get` | GET OIDC mappers. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | OIDC provider name | `[OIDC, google, Azure-OIDC]` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- mapper

## Example Usage

Ask Claude to help you work with Mapper resources:

### Create Mapper

> "Create a mapper named 'example' in the 'production' namespace"

### Get Mapper Details

> "Get details of the mapper named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mappers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mappers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mappers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @mapper.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mappers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
