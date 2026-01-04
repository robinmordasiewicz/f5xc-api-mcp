---
page_title: f5xc_quota - f5xc-api-mcp
subcategory: Billing And Usage
description: Create Quota.
---

# Quota

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace quota updates a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-quota-create` | Create Quota. |
| `f5xc-api-billingandusage-quota-get` | GET Quota |
| `f5xc-api-billingandusage-quota-list` | List Quota. |
| `f5xc-api-billingandusage-quota-update` | Replace Quota. |
| `f5xc-api-billingandusage-quota-delete` | DELETE Quota. |

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

- quota

**Modifies:**

- quota

**Deletes:**

- quota
- contained_resources

## Example Usage

Ask Claude to help you work with Quota resources:

### Create Quota

> "Create a quota named 'example' in the 'production' namespace"

### List Quotas

> "List all quotas in the 'production' namespace"

### Get Quota Details

> "Get details of the quota named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/quotas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/quotas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/quotas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @quota.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/quotas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
