---
page_title: f5xc_ike1 - f5xc-api-mcp
subcategory: Network
description: Create IKE Phase1 Profile.
---

# Ike1

Shape of the IKE Phase1 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-ike1-create` | Create IKE Phase1 Profile. |
| `f5xc-api-network-ike1-get` | GET IKE Phase1 profile configuration. |
| `f5xc-api-network-ike1-list` | List IKE Phase 1 Profile. |
| `f5xc-api-network-ike1-update` | Replace IKE Phase1 Profile configuration. |
| `f5xc-api-network-ike1-delete` | DELETE IKE Phase 1 Profile. |

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

Ask Claude to help you work with Ike1 resources:

### Create Ike1

> "Create a ike1 named 'example' in the 'production' namespace"

### List Ike1s

> "List all ike1s in the 'production' namespace"

### Get Ike1 Details

> "Get details of the ike1 named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike1s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike1s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike1s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @ike1.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ike1s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
