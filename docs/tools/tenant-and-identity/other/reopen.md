---
page_title: f5xc_reopen - f5xc-api-mcp
subcategory: Tenant And Identity
description: Reopen a closed customer support ticket in managed tenant.
---

# Reopen

Reopens a selected closed customer support ticket.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-reopen-create` | Reopen a closed customer support ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tp_id` | Third party ID | `-` |

## Example Usage

Ask Claude to help you work with Reopen resources:

### Create Reopen

> "Create a reopen named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reopens" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reopens/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reopens" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @reopen.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reopens/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
