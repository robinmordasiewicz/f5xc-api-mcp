---
page_title: f5xc_rate_limiter_policy - f5xc-api-mcp
subcategory: Virtual
description: Create Specification.
---

# Rate Limiter Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the Rate Limiter Policy Replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-rate-limiter-policy-create` | Create Specification. |
| `f5xc-api-virtual-rate-limiter-policy-get` | GET Specification. |
| `f5xc-api-virtual-rate-limiter-policy-list` | List Rate Limiter Policy. |
| `f5xc-api-virtual-rate-limiter-policy-update` | Replace Specification. |
| `f5xc-api-virtual-rate-limiter-policy-delete` | DELETE Rate Limiter Policy. |

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

- rate-limiter-policy

**Modifies:**

- rate-limiter-policy

**Deletes:**

- rate-limiter-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Rate Limiter Policy resources:

### Create Rate Limiter Policy

> "Create a rate-limiter-policy named 'example' in the 'production' namespace"

### List Rate Limiter Policys

> "List all rate-limiter-policys in the 'production' namespace"

### Get Rate Limiter Policy Details

> "Get details of the rate-limiter-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiter_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiter_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiter_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @rate_limiter_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rate_limiter_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
