---
page_title: f5xc_healthcheck - f5xc-api-mcp
subcategory: Virtual
description: Create Health Check.
---

# Healthcheck

Healthcheck object defines method to determine if the given Endpoint is healthy.
Single Healthcheck
object can be referred to by one or many Cluster objects.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-healthcheck-create` | Create Health Check. |
| `f5xc-api-virtual-healthcheck-get` | GET Health Check. |
| `f5xc-api-virtual-healthcheck-list` | List Health Check. |
| `f5xc-api-virtual-healthcheck-update` | Replace Health Check. |
| `f5xc-api-virtual-healthcheck-delete` | DELETE Health Check. |

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

Ask Claude to help you work with Healthcheck resources:

### Create Healthcheck

> "Create a healthcheck named 'example' in the 'production' namespace"

### List Healthchecks

> "List all healthchecks in the 'production' namespace"

### Get Healthcheck Details

> "Get details of the healthcheck named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/healthchecks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/healthchecks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/healthchecks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @healthcheck.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/healthchecks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
