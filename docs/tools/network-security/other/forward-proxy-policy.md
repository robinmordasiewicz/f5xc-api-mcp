---
page_title: f5xc_forward_proxy_policy - f5xc-api-mcp
subcategory: Network Security
description: Create Forward Proxy Policy.
---

# Forward Proxy Policy

Shape of the Forward Proxy Policy replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-forward-proxy-policy-create` | Create Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-get` | GET Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-list` | List Configure Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-update` | Replace Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-delete` | DELETE Configure Forward Proxy Policy. |

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

Ask Claude to help you work with Forward Proxy Policy resources:

### Create Forward Proxy Policy

> "Create a forward-proxy-policy named 'example' in the 'production' namespace"

### List Forward Proxy Policys

> "List all forward-proxy-policys in the 'production' namespace"

### Get Forward Proxy Policy Details

> "Get details of the forward-proxy-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/forward_proxy_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/forward_proxy_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/forward_proxy_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @forward_proxy_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/forward_proxy_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
