---
page_title: f5xc_asn - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions ASN.
---

# Asn

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions ASN.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-asn-create` | Malicious Report Transactions ASN. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- asn

## Example Usage

Ask Claude to help you work with Asn resources:

### Create Asn

> "Create a asn named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asns" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asns/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asns" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @asn.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asns/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
