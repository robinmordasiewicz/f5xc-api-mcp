---
page_title: f5xc_service_policy_rule - f5xc-api-mcp
subcategory: Virtual
description: Create Service Policy Rule.
---

# Service Policy Rule

Replace service_policy_rule replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-service-policy-rule-create` | Create Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-get` | GET Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-list` | List Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-update` | Replace Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-delete` | DELETE Service Policy Rule. |

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

Ask Claude to help you work with Service Policy Rule resources:

### Create Service Policy Rule

> "Create a service-policy-rule named 'example' in the 'production' namespace"

### List Service Policy Rules

> "List all service-policy-rules in the 'production' namespace"

### Get Service Policy Rule Details

> "Get details of the service-policy-rule named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policy_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policy_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policy_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @service_policy_rule.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policy_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
