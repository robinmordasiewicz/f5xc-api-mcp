---
page_title: f5xc_bot_endpoint_policie - f5xc-api-mcp
subcategory: Shape
description: List All Bot Endpoint Policies And Versions.
---

# Bot Endpoint Policie

GET all bot endpoint policies and versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-endpoint-policie-list` | List All Bot Endpoint Policies And Versions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Bot Endpoint Policie resources:

### List Bot Endpoint Policies

> "List all bot-endpoint-policies in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policies" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policies/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policies" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bot_endpoint_policie.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policies/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
