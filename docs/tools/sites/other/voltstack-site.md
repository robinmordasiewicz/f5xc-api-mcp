---
page_title: f5xc_voltstack_site - f5xc-api-mcp
subcategory: Sites
description: Create App Stack site.
---

# Voltstack Site

List the set of customer_edge_site in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-voltstack-site-create` | Create App Stack site. |
| `f5xc-api-sites-voltstack-site-get` | GET App Stack site. |
| `f5xc-api-sites-voltstack-site-list` | List Configure App Stack Site. |
| `f5xc-api-sites-voltstack-site-update` | Replace App Stack site. |
| `f5xc-api-sites-voltstack-site-delete` | DELETE Configure App Stack Site. |

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

Ask Claude to help you work with Voltstack Site resources:

### Create Voltstack Site

> "Create a voltstack-site named 'example' in the 'production' namespace"

### List Voltstack Sites

> "List all voltstack-sites in the 'production' namespace"

### Get Voltstack Site Details

> "Get details of the voltstack-site named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltstack_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltstack_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltstack_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @voltstack_site.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltstack_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
