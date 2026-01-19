---
page_title: f5xc_apm - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Create APM Service.
---

# Apm

Replaces configured APM Service with new set of parameters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-apm-create` | Create APM Service. |
| `f5xc-api-bigip-apm-get` | GET APM Service. |
| `f5xc-api-bigip-apm-list` | List BIG-IP APM as a Service. |
| `f5xc-api-bigip-apm-update` | Replace APM Service. |
| `f5xc-api-bigip-apm-delete` | DELETE BIG-IP APM as a Service. |

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

Ask Claude to help you work with Apm resources:

### Create Apm

> "Create a apm named 'example' in the 'production' namespace"

### List Apms

> "List all apms in the 'production' namespace"

### Get Apm Details

> "Get details of the apm named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/apms" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/apms/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/apms" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @apm.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/apms/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
