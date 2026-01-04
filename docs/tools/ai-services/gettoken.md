---
page_title: f5xc_gettoken - f5xc-api-mcp
subcategory: AI Services
description: Subscribe to BFDP pipeline.
---

# Gettoken

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe to BFDP pipeline.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-aiservices-gettoken-create` | Subscribe to BFDP pipeline. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettoken

## Example Usage

Ask Claude to help you work with Gettoken resources:

### Create Gettoken

> "Create a gettoken named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettokens" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettokens/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettokens" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @gettoken.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettokens/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
