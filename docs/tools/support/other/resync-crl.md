---
page_title: f5xc_resync_crl - f5xc-api-mcp
subcategory: Support
description: Resync CRL.
---

# Resync Crl

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Resync CRL by downloading from the server again.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-resync-crl-create` | Resync CRL. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `site` | Site Name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- resync-crl

## Example Usage

Ask Claude to help you work with Resync Crl resources:

### Create Resync Crl

> "Create a resync-crl named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resync_crls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resync_crls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resync_crls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @resync_crl.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resync_crls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
