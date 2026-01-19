---
page_title: f5xc_bot_network_policy - f5xc-api-mcp
subcategory: Shape
description: GET Bot network Policy.
---

# Bot Network Policy

List the set of bot_network_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-network-policy-get` | GET Bot network Policy. |
| `f5xc-api-shape-bot-network-policy-list` | List Bot network Policy. |
| `f5xc-api-shape-bot-network-policy-update` | Custom Replace Bot network Policy. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Bot Network Policy resources:

### List Bot Network Policys

> "List all bot-network-policys in the 'production' namespace"

### Get Bot Network Policy Details

> "Get details of the bot-network-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_network_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_network_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_network_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bot_network_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_network_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
