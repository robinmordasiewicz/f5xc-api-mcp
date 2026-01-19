---
page_title: f5xc_network_policy_view - f5xc-api-mcp
subcategory: Network Security
description: Create Network policy View.
---

# Network Policy View

Shape of the Network policy view replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-policy-view-create` | Create Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-get` | GET Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-list` | List Configure Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-update` | Replace Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-delete` | DELETE Configure Network policy View. |

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

Ask Claude to help you work with Network Policy View resources:

### Create Network Policy View

> "Create a network-policy-view named 'example' in the 'production' namespace"

### List Network Policy Views

> "List all network-policy-views in the 'production' namespace"

### Get Network Policy View Details

> "Get details of the network-policy-view named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policy_views" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policy_views/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policy_views" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @network_policy_view.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policy_views/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
