---
page_title: f5xc_alert_receiver - f5xc-api-mcp
subcategory: Statistics
description: Create Alert Receiver.
---

# Alert Receiver

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an Alert Receiver object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-alert-receiver-create` | Create Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-get` | GET Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-list` | List Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-update` | Replace Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-delete` | DELETE Alert Receiver. |

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

- alert-receiver

**Modifies:**

- alert-receiver

**Deletes:**

- alert-receiver
- contained_resources

## Example Usage

Ask Claude to help you work with Alert Receiver resources:

### Create Alert Receiver

> "Create a alert-receiver named 'example' in the 'production' namespace"

### List Alert Receivers

> "List all alert-receivers in the 'production' namespace"

### Get Alert Receiver Details

> "Get details of the alert-receiver named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_receivers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @alert_receiver.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_receivers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
