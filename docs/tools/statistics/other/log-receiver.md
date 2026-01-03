---
page_title: f5xc_log_receiver - f5xc-api-mcp
subcategory: Statistics
description: Create Log Receiver.
---

# Log Receiver

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an Log Receiver object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-log-receiver-create` | Create Log Receiver. |
| `f5xc-api-statistics-log-receiver-get` | GET Log Receiver. |
| `f5xc-api-statistics-log-receiver-list` | List Log Receiver. |
| `f5xc-api-statistics-log-receiver-update` | Replace Log Receiver. |
| `f5xc-api-statistics-log-receiver-delete` | DELETE Log Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- log-receiver

**Modifies:**

- log-receiver

**Deletes:**

- log-receiver
- contained_resources

## Example Usage

Ask Claude to help you work with Log Receiver resources:

### Create Log Receiver

> "Create a log-receiver named 'example' in the 'production' namespace"

### List Log Receivers

> "List all log-receivers in the 'production' namespace"

### Get Log Receiver Details

> "Get details of the log-receiver named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/log_receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/log_receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/log_receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @log_receiver.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/log_receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
