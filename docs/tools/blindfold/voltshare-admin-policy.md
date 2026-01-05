---
page_title: f5xc_voltshare_admin_policy - f5xc-api-mcp
subcategory: Blindfold
description: Create VoltShare Admin Policy.
---

# Voltshare Admin Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace voltshare_admin_policy replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-voltshare-admin-policy-create` | Create VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-get` | GET VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-list` | List VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-update` | Replace VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-delete` | DELETE VoltShare Admin Policy. |

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

- voltshare-admin-policy

**Modifies:**

- voltshare-admin-policy

**Deletes:**

- voltshare-admin-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Voltshare Admin Policy resources:

### Create Voltshare Admin Policy

> "Create a voltshare-admin-policy named 'example' in the 'production' namespace"

### List Voltshare Admin Policys

> "List all voltshare-admin-policys in the 'production' namespace"

### Get Voltshare Admin Policy Details

> "Get details of the voltshare-admin-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltshare_admin_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltshare_admin_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltshare_admin_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @voltshare_admin_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/voltshare_admin_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
