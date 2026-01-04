---
page_title: f5xc_get_registrations_by_token - f5xc-api-mcp
subcategory: Ce Management
description: GET Registration UID by Site Token.
---

# Get Registrations By Token

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns list of registration uids that are using particular site token.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-get-registrations-by-token-create` | GET Registration UID by Site Token. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-registrations-by-token

## Example Usage

Ask Claude to help you work with Get Registrations By Token resources:

### Create Get Registrations By Token

> "Create a get-registrations-by-token named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_registrations_by_tokens" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_registrations_by_tokens/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_registrations_by_tokens" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @get_registrations_by_token.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_registrations_by_tokens/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
