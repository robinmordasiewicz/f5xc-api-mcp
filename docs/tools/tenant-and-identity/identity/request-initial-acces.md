---
page_title: f5xc_request_initial_acces - f5xc-api-mcp
subcategory: Tenant And Identity
description: Request Initial Access.
---

# Request Initial Acces

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request initial access requests initial access for user within tenant.
Emails will be send to
tenant's admins with corresponding information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-request-initial-acces-update` | Request Initial Access. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- request-initial-acces

## Example Usage

Ask Claude to help you work with Request Initial Acces resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/request_initial_access" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/request_initial_access/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/request_initial_access" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @request_initial_acces.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/request_initial_access/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
