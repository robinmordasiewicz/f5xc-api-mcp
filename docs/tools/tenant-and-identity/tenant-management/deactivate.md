---
page_title: f5xc_deactivate - f5xc-api-mcp
subcategory: Tenant And Identity
description: DeactivateTenant.
---

# Deactivate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

This API mark tenant for deletion queue, after approve it will completely removed from the system.
This API proxies the request to eywa’s tenant disable API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-deactivate-update` | DeactivateTenant. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- deactivate

## Example Usage

Ask Claude to help you work with Deactivate resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deactivates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deactivates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deactivates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @deactivate.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/deactivates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
