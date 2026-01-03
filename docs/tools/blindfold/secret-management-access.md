---
page_title: f5xc_secret_management_access - f5xc-api-mcp
subcategory: Blindfold
description: Create Secret Management Access.
---

# Secret Management Access

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace secret_management_access replaces an existing object in storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-secret-management-access-create` | Create Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-get` | GET Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-list` | List Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-update` | Replace Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-delete` | DELETE Secret Management Access. |

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

- secret-management-access

**Modifies:**

- secret-management-access

**Deletes:**

- secret-management-access
- contained_resources

## Example Usage

Ask Claude to help you work with Secret Management Access resources:

### Create Secret Management Access

> "Create a secret-management-access named 'example' in the 'production' namespace"

### List Secret Management Accesss

> "List all secret-management-accesss in the 'production' namespace"

### Get Secret Management Access Details

> "Get details of the secret-management-access named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_management_accesss" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_management_accesss/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_management_accesss" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @secret_management_access.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/secret_management_accesss/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
