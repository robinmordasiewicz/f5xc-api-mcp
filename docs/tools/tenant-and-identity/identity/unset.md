---
page_title: f5xc_unset - f5xc-api-mcp
subcategory: Tenant And Identity
description: Unset admin ntfn preference.
---

# Unset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Unset admin ntfn preference unsets specific admin notification preference for the user and store it
in user settings object.
It can be used in email newsletters to allow easy unsubscribing for users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-unset-update` | Unset admin ntfn preference. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- unset

## Example Usage

Ask Claude to help you work with Unset resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/unsets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/unsets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/unsets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @unset.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/unsets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
