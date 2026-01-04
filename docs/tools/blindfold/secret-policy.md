---
page_title: f5xc_secret_policy - f5xc-api-mcp
subcategory: Blindfold
description: Create Secret Policy.
---

# Secret Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace secret_policy replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-secret-policy-create` | Create Secret Policy. |
| `f5xc-api-blindfold-secret-policy-get` | GET Secret Policy. |
| `f5xc-api-blindfold-secret-policy-list` | List Secret Policy. |
| `f5xc-api-blindfold-secret-policy-update` | Replace Secret Policy. |
| `f5xc-api-blindfold-secret-policy-delete` | DELETE Secret Policy. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- secret-policy

**Modifies:**

- secret-policy

**Deletes:**

- secret-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Secret Policy resources:

### Create Secret Policy

> "Create a secret-policy named 'example' in the 'production' namespace"

### List Secret Policys

> "List all secret-policys in the 'production' namespace"

### Get Secret Policy Details

> "Get details of the secret-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @secret_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
