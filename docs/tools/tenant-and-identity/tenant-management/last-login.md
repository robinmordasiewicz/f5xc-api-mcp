---
page_title: f5xc_last_login - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetLastLoginMap.
---

# Last Login

GetLastLoginMap returns last login timestamp for each user within a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-last-login-list` | GetLastLoginMap. |

## Example Usage

Ask Claude to help you work with Last Login resources:

### List Last Logins

> "List all last-logins in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/last_logins" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/last_logins/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/last_logins" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @last_login.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/last_logins/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
