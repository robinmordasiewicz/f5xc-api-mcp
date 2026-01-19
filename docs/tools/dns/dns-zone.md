---
page_title: f5xc_dns_zone - f5xc-api-mcp
subcategory: DNS
description: Create DNS Zone.
---

# DNS Zone

Create DNS Zone in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-zone-create` | Create DNS Zone. |
| `f5xc-api-dns-dns-zone-get` | GET DNS Zone. |
| `f5xc-api-dns-dns-zone-list` | List DNS Zone. |
| `f5xc-api-dns-dns-zone-update` | Replace DNS Zone. |
| `f5xc-api-dns-dns-zone-delete` | DELETE DNS Zone. |

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

Ask Claude to help you work with DNS Zone resources:

### Create DNS Zone

> "Create a dns-zone named 'example' in the 'production' namespace"

### List DNS Zones

> "List all dns-zones in the 'production' namespace"

### Get DNS Zone Details

> "Get details of the dns-zone named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_zones" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_zones/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_zones" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dns_zone.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_zones/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
