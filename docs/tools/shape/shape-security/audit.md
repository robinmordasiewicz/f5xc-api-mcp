---
page_title: f5xc_audit - f5xc-api-mcp
subcategory: Shape
description: GET SAFE Block table list.
---

# Audit

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET SAFE block table list.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-audit-list` | GET SAFE Block table list. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dimt` | Account_id/device_id how to apply the blocking rule. | `Account_id.` |
| `dimv` | The relevant account_id/device_id. | `Goldcha` |
| `version` | The API version to use. | `V2` |

## Example Usage

Ask Claude to help you work with Audit resources:

### List Audits

> "List all audits in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audits" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audits/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audits" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @audit.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/audits/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
