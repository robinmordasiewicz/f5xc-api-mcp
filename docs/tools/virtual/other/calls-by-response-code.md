---
page_title: f5xc_calls_by_response_code - f5xc-api-mcp
subcategory: Virtual
description: GET Total API Calls for Virtual Host.
---

# Calls By Response Code

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET total API calls for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-calls-by-response-code-create` | GET Total API Calls for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- calls-by-response-code

## Example Usage

Ask Claude to help you work with Calls By Response Code resources:

### Create Calls By Response Code

> "Create a calls-by-response-code named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/calls_by_response_codes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/calls_by_response_codes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/calls_by_response_codes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @calls_by_response_code.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/calls_by_response_codes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
