---
page_title: f5xc_protocol_policer - f5xc-api-mcp
subcategory: Rate Limiting
description: Create Protocol Policer.
---

# Protocol Policer

Create a protocol_policer object, protocol_policer object contains list
of L4 protocol match
condition and corresponding traffic rate limits.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ratelimiting-protocol-policer-create` | Create Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-get` | GET Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-list` | List Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-update` | Replace Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-delete` | DELETE Protocol Policer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Protocol Policer resources:

### Create Protocol Policer

> "Create a protocol-policer named 'example' in the 'production' namespace"

### List Protocol Policers

> "List all protocol-policers in the 'production' namespace"

### Get Protocol Policer Details

> "Get details of the protocol-policer named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_policers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_policers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_policers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @protocol_policer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/protocol_policers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
