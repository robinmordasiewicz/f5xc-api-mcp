---
page_title: f5xc_certified_hardware - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: GET Certified Hardware.
---

# Certified Hardware

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the set of certified_hardware in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-certified-hardware-get` | GET Certified Hardware. |
| `f5xc-api-cloudinfrastructure-certified-hardware-list` | List Certified Hardware. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Certified Hardware resources:

### List Certified Hardwares

> "List all certified-hardwares in the 'production' namespace"

### Get Certified Hardware Details

> "Get details of the certified-hardware named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certified_hardwares" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certified_hardwares/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certified_hardwares" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @certified_hardware.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/certified_hardwares/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
