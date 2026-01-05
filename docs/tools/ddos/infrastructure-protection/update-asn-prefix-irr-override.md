---
page_title: f5xc_update_asn_prefix_irr_override - f5xc-api-mcp
subcategory: Ddos
description: Update ASN Prefix IRR Override.
---

# Update Asn Prefix Irr Override

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Infraprotect ASN Prefix IRR Override.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-asn-prefix-irr-override-create` | Update ASN Prefix IRR Override. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-asn-prefix-irr-override

## Example Usage

Ask Claude to help you work with Update Asn Prefix Irr Override resources:

### Create Update Asn Prefix Irr Override

> "Create a update-asn-prefix-irr-override named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_prefix_irr_overrides" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_prefix_irr_overrides/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_prefix_irr_overrides" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @update_asn_prefix_irr_override.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_asn_prefix_irr_overrides/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
