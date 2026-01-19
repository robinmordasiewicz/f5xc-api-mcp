---
page_title: f5xc_global_log_receiver - f5xc-api-mcp
subcategory: Statistics
description: Create Global Log Receiver.
---

# Global Log Receiver

Replaces the content of an Global Log Receiver object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-global-log-receiver-create` | Create Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-get` | GET Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-list` | List Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-update` | Replace Global Log Receiver. |
| `f5xc-api-statistics-global-log-receiver-delete` | DELETE Global Log Receiver. |

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

Ask Claude to help you work with Global Log Receiver resources:

### Create Global Log Receiver

> "Create a global-log-receiver named 'example' in the 'production' namespace"

### List Global Log Receivers

> "List all global-log-receivers in the 'production' namespace"

### Get Global Log Receiver Details

> "Get details of the global-log-receiver named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_log_receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_log_receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_log_receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @global_log_receiver.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_log_receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
