---
page_title: f5xc_policy_based_routing - f5xc-api-mcp
subcategory: Network Security
description: Create Policy based Routing.
---

# Policy Based Routing

Shape of the Network Policy based routing replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-policy-based-routing-create` | Create Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-get` | GET Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-list` | List Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-update` | Replace Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-delete` | DELETE Policy based Routing. |

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

Ask Claude to help you work with Policy Based Routing resources:

### Create Policy Based Routing

> "Create a policy-based-routing named 'example' in the 'production' namespace"

### List Policy Based Routings

> "List all policy-based-routings in the 'production' namespace"

### Get Policy Based Routing Details

> "Get details of the policy-based-routing named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @policy_based_routing.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policy_based_routings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
