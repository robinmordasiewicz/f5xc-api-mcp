---
page_title: f5xc_sensitive_data_policy - f5xc-api-mcp
subcategory: Data And Privacy Security
description: Create Sensitive Data Discovery.
---

# Sensitive Data Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace sensitive_data_policy replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-create` | Create Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-get` | GET Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-list` | List Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-update` | Replace Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-delete` | DELETE Sensitive Data Discovery. |

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

- sensitive-data-policy

**Modifies:**

- sensitive-data-policy

**Deletes:**

- sensitive-data-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Sensitive Data Policy resources:

### Create Sensitive Data Policy

> "Create a sensitive-data-policy named 'example' in the 'production' namespace"

### List Sensitive Data Policys

> "List all sensitive-data-policys in the 'production' namespace"

### Get Sensitive Data Policy Details

> "Get details of the sensitive-data-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/sensitive_data_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/sensitive_data_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/sensitive_data_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @sensitive_data_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/sensitive_data_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
