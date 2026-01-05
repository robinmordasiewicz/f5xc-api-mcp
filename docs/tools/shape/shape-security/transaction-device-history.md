---
page_title: f5xc_transaction_device_history - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionDeviceHistory.
---

# Transaction Device History

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction device history.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-device-history-create` | PostSafeTransactionDeviceHistory. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-device-history

## Example Usage

Ask Claude to help you work with Transaction Device History resources:

### Create Transaction Device History

> "Create a transaction-device-history named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_device_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_device_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_device_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @transaction_device_history.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_device_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
