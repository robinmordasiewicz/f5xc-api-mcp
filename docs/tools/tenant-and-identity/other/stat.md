---
page_title: f5xc_stat - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET API Endpoints Stats for Namespace.
---

# Stat

GET API endpoints stats for the given Namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-stat-create` | GET API Endpoints Stats for Namespace. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Stat resources:

### Create Stat

> "Create a stat named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/stats" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/stats/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/stats" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @stat.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/stats/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
