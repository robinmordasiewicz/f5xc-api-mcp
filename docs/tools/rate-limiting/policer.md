---
page_title: f5xc_policer - f5xc-api-mcp
subcategory: Rate Limiting
description: Create Policer.
---

# Policer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace a given policer with changed traffic rate limits.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ratelimiting-policer-create` | Create Policer. |
| `f5xc-api-ratelimiting-policer-get` | GET Policer. |
| `f5xc-api-ratelimiting-policer-list` | List Policer. |
| `f5xc-api-ratelimiting-policer-update` | Replace Policer. |
| `f5xc-api-ratelimiting-policer-delete` | DELETE Policer. |

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

- policer

**Modifies:**

- policer

**Deletes:**

- policer
- contained_resources

## Example Usage

Ask Claude to help you work with Policer resources:

### Create Policer

> "Create a policer named 'example' in the 'production' namespace"

### List Policers

> "List all policers in the 'production' namespace"

### Get Policer Details

> "Get details of the policer named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @policer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/policers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
