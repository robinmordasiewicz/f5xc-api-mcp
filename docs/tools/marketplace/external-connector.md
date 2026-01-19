---
page_title: f5xc_external_connector - f5xc-api-mcp
subcategory: Marketplace
description: Create external_connector configuration.
---

# External Connector

Shape of the external_connector configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-external-connector-create` | Create external_connector configuration. |
| `f5xc-api-marketplace-external-connector-get` | GET external_connector configuration. |
| `f5xc-api-marketplace-external-connector-list` | List External Connector Configuration. |
| `f5xc-api-marketplace-external-connector-update` | Replace external_connector configuration. |
| `f5xc-api-marketplace-external-connector-delete` | DELETE External Connector Configuration. |

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

Ask Claude to help you work with External Connector resources:

### Create External Connector

> "Create a external-connector named 'example' in the 'production' namespace"

### List External Connectors

> "List all external-connectors in the 'production' namespace"

### Get External Connector Details

> "Get details of the external-connector named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/external_connectors" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/external_connectors/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/external_connectors" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @external_connector.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/external_connectors/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
