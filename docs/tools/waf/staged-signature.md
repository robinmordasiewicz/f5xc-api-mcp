---
page_title: f5xc_staged_signature - f5xc-api-mcp
subcategory: WAF
description: Staged Signatures.
---

# Staged Signature

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET Staged Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-staged-signature-create` | Staged Signatures. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |
| `vh_name` | Vh_name | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- staged-signature

## Example Usage

Ask Claude to help you work with Staged Signature resources:

### Create Staged Signature

> "Create a staged-signature named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/staged_signatures" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/staged_signatures/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/staged_signatures" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @staged_signature.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/staged_signatures/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
