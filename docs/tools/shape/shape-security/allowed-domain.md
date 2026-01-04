---
page_title: f5xc_allowed_domain - f5xc-api-mcp
subcategory: Shape
description: Create Allowed Domain.
---

# Allowed Domain

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of allowed_domain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-allowed-domain-create` | Create Allowed Domain. |
| `f5xc-api-shape-allowed-domain-get` | GET Allowed Domain. |
| `f5xc-api-shape-allowed-domain-list` | List Client-Side Defense Allowed Domain. |
| `f5xc-api-shape-allowed-domain-delete` | DELETE Client-Side Defense Allowed Domain. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

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

- allowed-domain

**Deletes:**

- allowed-domain
- contained_resources

## Example Usage

Ask Claude to help you work with Allowed Domain resources:

### Create Allowed Domain

> "Create a allowed-domain named 'example' in the 'production' namespace"

### List Allowed Domains

> "List all allowed-domains in the 'production' namespace"

### Get Allowed Domain Details

> "Get details of the allowed-domain named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/allowed_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/allowed_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/allowed_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @allowed_domain.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/allowed_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
