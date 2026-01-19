---
page_title: f5xc_fast_acl_rule - f5xc-api-mcp
subcategory: Network Security
description: Create Fast ACL Rule.
---

# Fast Acl Rule

Replace a given Fast ACL rule, `fast_acl_rule` has specification to match source IP, source port,
protocol and action to apply.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-fast-acl-rule-create` | Create Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-get` | GET Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-list` | List Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-update` | Replace Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-delete` | DELETE Fast ACL Rule. |

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

Ask Claude to help you work with Fast Acl Rule resources:

### Create Fast Acl Rule

> "Create a fast-acl-rule named 'example' in the 'production' namespace"

### List Fast Acl Rules

> "List all fast-acl-rules in the 'production' namespace"

### Get Fast Acl Rule Details

> "Get details of the fast-acl-rule named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fast_acl_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fast_acl_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fast_acl_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @fast_acl_rule.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fast_acl_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
