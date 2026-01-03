---
page_title: f5xc_gettopriskyaccount - f5xc-api-mcp
subcategory: Shape
description: GetTopRiskyAccounts.
---

# Gettopriskyaccount

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top risky accounts data request in a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettopriskyaccount-create` | GetTopRiskyAccounts. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettopriskyaccount

## Example Usage

Ask Claude to help you work with Gettopriskyaccount resources:

### Create Gettopriskyaccount

> "Create a gettopriskyaccount named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyaccounts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyaccounts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyaccounts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @gettopriskyaccount.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyaccounts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
