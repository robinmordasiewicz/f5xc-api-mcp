---
page_title: f5xc_infraprotect_asn - f5xc-api-mcp
subcategory: Ddos
description: Create DDoS transit ASN.
---

# Infraprotect Asn

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of infraprotect_asn in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-asn-create` | Create DDoS transit ASN. |
| `f5xc-api-ddos-infraprotect-asn-get` | GET Infraprotect ASN. |
| `f5xc-api-ddos-infraprotect-asn-list` | List Infraprotect ASN. |
| `f5xc-api-ddos-infraprotect-asn-update` | Replace DDoS transit ASN. |
| `f5xc-api-ddos-infraprotect-asn-delete` | DELETE Infraprotect ASN. |

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

- infraprotect-asn

**Modifies:**

- infraprotect-asn

**Deletes:**

- infraprotect-asn
- contained_resources

## Example Usage

Ask Claude to help you work with Infraprotect Asn resources:

### Create Infraprotect Asn

> "Create a infraprotect-asn named 'example' in the 'production' namespace"

### List Infraprotect Asns

> "List all infraprotect-asns in the 'production' namespace"

### Get Infraprotect Asn Details

> "Get details of the infraprotect-asn named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_asns" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_asns/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_asns" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @infraprotect_asn.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_asns/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
