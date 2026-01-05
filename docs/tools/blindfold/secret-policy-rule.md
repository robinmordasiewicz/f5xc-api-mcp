---
page_title: f5xc_secret_policy_rule - f5xc-api-mcp
subcategory: Blindfold
description: Create Secret Policy Rule.
---

# Secret Policy Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace secret_policy_rule creates a new object in storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-secret-policy-rule-create` | Create Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-get` | GET Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-list` | List Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-update` | Replace Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-delete` | DELETE Secret Policy Rule. |

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

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- secret-policy-rule

**Modifies:**

- secret-policy-rule

**Deletes:**

- secret-policy-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Secret Policy Rule resources:

### Create Secret Policy Rule

> "Create a secret-policy-rule named 'example' in the 'production' namespace"

### List Secret Policy Rules

> "List all secret-policy-rules in the 'production' namespace"

### Get Secret Policy Rule Details

> "Get details of the secret-policy-rule named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policy_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policy_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policy_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @secret_policy_rule.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policy_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
