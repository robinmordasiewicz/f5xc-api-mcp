---
page_title: f5xc_transactions_over_time - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionsOverTime.
---

# Transactions Over Time

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transactions-over-time-create` | PostSafeTransactionsOverTime. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transactions-over-time

## Example Usage

Ask Claude to help you work with Transactions Over Time resources:

### Create Transactions Over Time

> "Create a transactions-over-time named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_over_times" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_over_times/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_over_times" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @transactions_over_time.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_over_times/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
