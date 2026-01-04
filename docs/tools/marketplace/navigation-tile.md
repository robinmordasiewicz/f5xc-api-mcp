---
page_title: f5xc_navigation_tile - f5xc-api-mcp
subcategory: Marketplace
description: GET Navigation Tile.
---

# Navigation Tile

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET navigation_tile reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-navigation-tile-get` | GET Navigation Tile. |
| `f5xc-api-marketplace-navigation-tile-list` | List Navigation Tile. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Navigation Tile resources:

### List Navigation Tiles

> "List all navigation-tiles in the 'production' namespace"

### Get Navigation Tile Details

> "Get details of the navigation-tile named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/navigation_tiles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/navigation_tiles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/navigation_tiles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @navigation_tile.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/navigation_tiles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
