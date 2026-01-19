---
page_title: f5xc_alert_policy - f5xc-api-mcp
subcategory: Statistics
description: Create Alert Policy.
---

# Alert Policy

Replaces the content of the Alert Policy Object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-alert-policy-create` | Create Alert Policy. |
| `f5xc-api-statistics-alert-policy-get` | GET Alert Policy. |
| `f5xc-api-statistics-alert-policy-list` | List Alert Policy. |
| `f5xc-api-statistics-alert-policy-update` | Replace Alert Policy. |
| `f5xc-api-statistics-alert-policy-delete` | DELETE Alert Policy. |

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

Ask Claude to help you work with Alert Policy resources:

### Create Alert Policy

> "Create a alert-policy named 'example' in the 'production' namespace"

### List Alert Policys

> "List all alert-policys in the 'production' namespace"

### Get Alert Policy Details

> "Get details of the alert-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @alert_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alert_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
