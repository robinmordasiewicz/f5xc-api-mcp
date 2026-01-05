---
page_title: f5xc_ua - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions UA.
---

# Ua

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions UA.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-ua-create` | Malicious Report Transactions UA. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ua

## Example Usage

Ask Claude to help you work with Ua resources:

### Create Ua

> "Create a ua named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/uas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/uas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/uas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @ua.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/uas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
