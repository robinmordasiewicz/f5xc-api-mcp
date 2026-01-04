---
page_title: f5xc_requestConfig - f5xc-api-mcp
subcategory: Ce Management
description: Registration Config.
---

# RequestConfig

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API endpoint for returning configuration for admitted registrations.
It will fail with known error
for non-ADMITTED registration.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-requestconfig-create` | Registration Config. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- requestConfig

## Example Usage

Ask Claude to help you work with RequestConfig resources:

### Create RequestConfig

> "Create a requestConfig named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/requestConfigs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/requestConfigs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/requestConfigs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @requestConfig.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/requestConfigs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
