---
page_title: f5xc_sync - f5xc-api-mcp
subcategory: Tenant And Identity
description: Sync user
---

# Sync

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

In case when user created initially from identity provider we need to sync the user data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-sync-create` | Sync user |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- sync

## Example Usage

Ask Claude to help you work with Sync resources:

### Create Sync

> "Create a sync named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/syncs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/syncs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/syncs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @sync.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/syncs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
