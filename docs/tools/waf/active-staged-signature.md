---
page_title: f5xc_active_staged_signature - f5xc-api-mcp
subcategory: WAF
description: Active Staged Signatures.
---

# Active Staged Signature

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET active Staged Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-active-staged-signature-list` | Active Staged Signatures. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |
| `vh_name` | Vh_name | `Blogging-app.` |

## Example Usage

Ask Claude to help you work with Active Staged Signature resources:

### List Active Staged Signatures

> "List all active-staged-signatures in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_staged_signatures" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_staged_signatures/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_staged_signatures" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @active_staged_signature.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_staged_signatures/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
