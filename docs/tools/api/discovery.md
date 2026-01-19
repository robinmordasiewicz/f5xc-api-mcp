---
page_title: f5xc_discovery - f5xc-api-mcp
subcategory: API
description: Create Discovery.
---

# Discovery

API to replace discovery object for a site or virtual site in system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-discovery-create` | Create Discovery. |
| `f5xc-api-api-discovery-get` | GET Discovery. |
| `f5xc-api-api-discovery-list` | List Discovery. |
| `f5xc-api-api-discovery-update` | Replace Discovery. |
| `f5xc-api-api-discovery-delete` | DELETE Discovery. |

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

Ask Claude to help you work with Discovery resources:

### Create Discovery

> "Create a discovery named 'example' in the 'production' namespace"

### List Discoverys

> "List all discoverys in the 'production' namespace"

### Get Discovery Details

> "Get details of the discovery named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discoverys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discoverys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discoverys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @discovery.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discoverys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
