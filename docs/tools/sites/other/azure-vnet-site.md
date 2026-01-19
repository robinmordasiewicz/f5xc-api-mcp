---
page_title: f5xc_azure_vnet_site - f5xc-api-mcp
subcategory: Sites
description: Create Azure VNet site.
---

# AZURE VNET Site

Shape of the Azure VNet site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-azure-vnet-site-create` | Create Azure VNet site. |
| `f5xc-api-sites-azure-vnet-site-get` | GET Azure VNet site. |
| `f5xc-api-sites-azure-vnet-site-list` | List Configure Azure VNet Site. |
| `f5xc-api-sites-azure-vnet-site-update` | Replace Azure VNet site. |
| `f5xc-api-sites-azure-vnet-site-delete` | DELETE Configure Azure VNet Site. |

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

Ask Claude to help you work with AZURE VNET Site resources:

### Create AZURE VNET Site

> "Create a azure-vnet-site named 'example' in the 'production' namespace"

### List AZURE VNET Sites

> "List all azure-vnet-sites in the 'production' namespace"

### Get AZURE VNET Site Details

> "Get details of the azure-vnet-site named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/azure_vnet_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/azure_vnet_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/azure_vnet_sites" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @azure_vnet_site.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/azure_vnet_sites/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
