---
page_title: f5xc_code_base_integration - f5xc-api-mcp
subcategory: API
description: CREATE Code Base Integration.
---

# Code Base Integration

List the set of code_base_integration in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-code-base-integration-create` | CREATE Code Base Integration. |
| `f5xc-api-api-code-base-integration-get` | GET Code Base Integration. |
| `f5xc-api-api-code-base-integration-list` | List Code Base Integration. |
| `f5xc-api-api-code-base-integration-update` | Replace Code Base Integration. |
| `f5xc-api-api-code-base-integration-delete` | DELETE Code Base Integration. |

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

Ask Claude to help you work with Code Base Integration resources:

### Create Code Base Integration

> "Create a code-base-integration named 'example' in the 'production' namespace"

### List Code Base Integrations

> "List all code-base-integrations in the 'production' namespace"

### Get Code Base Integration Details

> "Get details of the code-base-integration named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/code_base_integrations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/code_base_integrations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/code_base_integrations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @code_base_integration.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/code_base_integrations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
