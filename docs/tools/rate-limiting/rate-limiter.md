---
page_title: f5xc_rate_limiter - f5xc-api-mcp
subcategory: Rate Limiting
description: Create Rate Limiter.
---

# Rate Limiter

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace rate_limiter replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ratelimiting-rate-limiter-create` | Create Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-get` | GET Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-list` | List Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-update` | Replace Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-delete` | DELETE Rate Limiter. |

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

- rate-limiter

**Modifies:**

- rate-limiter

**Deletes:**

- rate-limiter
- contained_resources

## Example Usage

Ask Claude to help you work with Rate Limiter resources:

### Create Rate Limiter

> "Create a rate-limiter named 'example' in the 'production' namespace"

### List Rate Limiters

> "List all rate-limiters in the 'production' namespace"

### Get Rate Limiter Details

> "Get details of the rate-limiter named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiters" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiters/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiters" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @rate_limiter.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiters/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
