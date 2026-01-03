---
page_title: f5xc_cdn_cache_rule - f5xc-api-mcp
subcategory: CDN
description: Create CDN cache rule.
---

# Cdn Cache Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of cdn_cache_rule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-cdn-cache-rule-create` | Create CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-get` | GET CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-list` | List CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-update` | Replace CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-delete` | DELETE CDN cache rule. |

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

- cdn-cache-rule

**Modifies:**

- cdn-cache-rule

**Deletes:**

- cdn-cache-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Cdn Cache Rule resources:

### Create Cdn Cache Rule

> "Create a cdn-cache-rule named 'example' in the 'production' namespace"

### List Cdn Cache Rules

> "List all cdn-cache-rules in the 'production' namespace"

### Get Cdn Cache Rule Details

> "Get details of the cdn-cache-rule named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_cache_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_cache_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_cache_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cdn_cache_rule.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cdn_cache_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
