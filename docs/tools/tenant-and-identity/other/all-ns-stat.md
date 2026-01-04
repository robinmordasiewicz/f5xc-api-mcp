---
page_title: f5xc_all_ns_stat - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET API Endpoints Stats for All Namespaces.
---

# All Ns Stat

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET API endpoints stats for all Namespaces. This API is specific to system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-all-ns-stat-create` | GET API Endpoints Stats for All Namespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- all-ns-stat

## Example Usage

Ask Claude to help you work with All Ns Stat resources:

### Create All Ns Stat

> "Create a all-ns-stat named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_stats" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_stats/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_stats" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @all_ns_stat.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_stats/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
