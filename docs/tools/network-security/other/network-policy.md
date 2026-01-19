---
page_title: f5xc_network_policy - f5xc-api-mcp
subcategory: Network Security
description: Create Network Policy.
---

# Network Policy

Replaces configured Network Policy with new set of parameters in specified namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-policy-create` | Create Network Policy. |
| `f5xc-api-networksecurity-network-policy-get` | GET Network Policy. |
| `f5xc-api-networksecurity-network-policy-list` | List Network Policy. |
| `f5xc-api-networksecurity-network-policy-update` | Replace Network Policy. |
| `f5xc-api-networksecurity-network-policy-delete` | DELETE Network Policy. |

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

Ask Claude to help you work with Network Policy resources:

### Create Network Policy

> "Create a network-policy named 'example' in the 'production' namespace"

### List Network Policys

> "List all network-policys in the 'production' namespace"

### Get Network Policy Details

> "Get details of the network-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @network_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/network_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
