---
page_title: f5xc_migrate - f5xc-api-mcp
subcategory: Tenant And Identity
description: Migrate CTM child tenants.
---

# Migrate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Migrate ACTIVE child tenants from existing CTM to a specified new CTM.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-migrate-create` | Migrate CTM child tenants. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- migrate

## Example Usage

Ask Claude to help you work with Migrate resources:

### Create Migrate

> "Create a migrate named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/migrates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/migrates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/migrates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @migrate.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/migrates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
