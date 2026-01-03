---
page_title: f5xc_bot_endpoint_policy - f5xc-api-mcp
subcategory: Shape
description: GET Bot Endpoint Policy.
---

# Bot Endpoint Policy

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of bot_endpoint_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-endpoint-policy-get` | GET Bot Endpoint Policy. |
| `f5xc-api-shape-bot-endpoint-policy-list` | List Bot Endpoint Policy. |
| `f5xc-api-shape-bot-endpoint-policy-update` | Custom Replace Bot Endpoint Policy. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- bot-endpoint-policy

## Example Usage

Ask Claude to help you work with Bot Endpoint Policy resources:

### List Bot Endpoint Policys

> "List all bot-endpoint-policys in the 'production' namespace"

### Get Bot Endpoint Policy Details

> "Get details of the bot-endpoint-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bot_endpoint_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_endpoint_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
