---
page_title: f5xc_cache_purge - f5xc-api-mcp
subcategory: CDN
description: Purge CDN Cache.
---

# Cache Purge

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Initiate Purge for Edge CDN Cache.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-cache-purge-create` | Purge CDN Cache. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | CDN Distribution Name | `CDN-1` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- cache-purge

## Example Usage

Ask Claude to help you work with Cache Purge resources:

### Create Cache Purge

> "Create a cache-purge named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cache_purges" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cache_purges/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cache_purges" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cache_purge.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cache_purges/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
