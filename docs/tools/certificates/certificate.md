---
page_title: f5xc_certificate - f5xc-api-mcp
subcategory: Certificates
description: Create Certificate.
---

# Certificate

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of certificate in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-certificates-certificate-create` | Create Certificate. |
| `f5xc-api-certificates-certificate-get` | GET Certificate. |
| `f5xc-api-certificates-certificate-list` | List Certificate. |
| `f5xc-api-certificates-certificate-update` | Replace Certificate. |
| `f5xc-api-certificates-certificate-delete` | DELETE Certificate. |

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

- certificate

**Modifies:**

- certificate

**Deletes:**

- certificate
- contained_resources

## Example Usage

Ask Claude to help you work with Certificate resources:

### Create Certificate

> "Create a certificate named 'example' in the 'production' namespace"

### List Certificates

> "List all certificates in the 'production' namespace"

### Get Certificate Details

> "Get details of the certificate named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @certificate.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certificates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
