---
page_title: f5xc_bot_allowlist_policy - f5xc-api-mcp
subcategory: Shape
description: GET Bot allowlist Policy.
---

# Bot Allowlist Policy

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of bot_allowlist_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-allowlist-policy-get` | GET Bot allowlist Policy. |
| `f5xc-api-shape-bot-allowlist-policy-list` | List Bot allowlist Policy. |
| `f5xc-api-shape-bot-allowlist-policy-update` | Custom Replace Bot allowlist Policy. |

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

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- bot-allowlist-policy

## Example Usage

Ask Claude to help you work with Bot Allowlist Policy resources:

### List Bot Allowlist Policys

> "List all bot-allowlist-policys in the 'production' namespace"

### Get Bot Allowlist Policy Details

> "Get details of the bot-allowlist-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_allowlist_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_allowlist_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_allowlist_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bot_allowlist_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bot_allowlist_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
