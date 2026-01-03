---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Marketplace
description: GET Status of Terraform for view.
---

# Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returned from list of terraform parameter status objects for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-statu-list` | GET Status of Terraform for view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `view_kind` | Kind of View | `Value` |
| `view_name` | Name of view | `Value` |

## Example Usage

Ask Claude to help you work with Statu resources:

### List Status

> "List all status in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @statu.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
