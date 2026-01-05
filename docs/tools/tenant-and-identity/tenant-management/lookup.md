---
page_title: f5xc_lookup - f5xc-api-mcp
subcategory: Tenant And Identity
description: Lookup cname.
---

# Lookup

!!! info "Low Risk"
    Operations on this resource are generally safe.

Checks if a cname is available.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-lookup-list` | Lookup cname. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `cname` | Cname to look-uo. | `-` |
| `namespace` | Namespace to query. | `-` |

## Example Usage

Ask Claude to help you work with Lookup resources:

### List Lookups

> "List all lookups in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @lookup.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
