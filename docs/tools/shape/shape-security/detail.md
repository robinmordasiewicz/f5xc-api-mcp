---
page_title: f5xc_detail - f5xc-api-mcp
subcategory: Shape
description: GET SAFE Block Details.
---

# Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET SAFE block details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-detail-list` | GET SAFE Block Details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `account_id` | String representing the account ID. | `Test123` |
| `device_id` | String representing the device ID. | `Device123` |
| `version` | The API version to use. | `V2` |

## Example Usage

Ask Claude to help you work with Detail resources:

### List Details

> "List all details in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @detail.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
