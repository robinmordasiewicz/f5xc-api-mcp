---
page_title: f5xc_namespace - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Namespace.
---

# Namespace

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Replaces attributes of a namespace including its metadata like labels, description etc.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-namespace-create` | Create Namespace. |
| `f5xc-api-tenantandidentity-namespace-get` | GET Namespace. |
| `f5xc-api-tenantandidentity-namespace-list` | List Namespace. |
| `f5xc-api-tenantandidentity-namespace-update` | Replace Namespace. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | The namespace in which the configuration object is present. | `Ns1` |
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- namespace

**Modifies:**

- namespace

## Example Usage

Ask Claude to help you work with Namespace resources:

### Create Namespace

> "Create a namespace named 'example' in the 'production' namespace"

### List Namespaces

> "List all namespaces in the 'production' namespace"

### Get Namespace Details

> "Get details of the namespace named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/namespaces" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/namespaces/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/namespaces" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @namespace.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/namespaces/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
