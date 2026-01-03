---
page_title: f5xc_update_asn_review_statu - f5xc-api-mcp
subcategory: Ddos
description: Update ASN Review Status.
---

# Update Asn Review Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Infraprotect ASN Review Status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-asn-review-statu-create` | Update ASN Review Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-asn-review-statu

## Example Usage

Ask Claude to help you work with Update Asn Review Statu resources:

### Create Update Asn Review Statu

> "Create a update-asn-review-statu named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_review_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_review_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_review_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @update_asn_review_statu.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_review_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
