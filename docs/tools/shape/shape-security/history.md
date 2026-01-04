---
page_title: f5xc_history - f5xc-api-mcp
subcategory: Shape
description: GET the change history for a bot detection rule.
---

# History

!!! info "Low Risk"
    Operations on this resource are generally safe.

Getbotdetectionrulechangehistory CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-history-get` | GET the change history for a bot detection rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `Rule_CB_DUBEXLDQKV.` |
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with History resources:

### Get History Details

> "Get details of the history named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @history.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
