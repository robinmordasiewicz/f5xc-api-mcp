---
page_title: f5xc_transaction_timeline - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionTimeline.
---

# Transaction Timeline

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction timeline.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-timeline-create` | PostSafeTransactionTimeline. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-timeline

## Example Usage

Ask Claude to help you work with Transaction Timeline resources:

### Create Transaction Timeline

> "Create a transaction-timeline named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_timelines" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_timelines/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_timelines" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @transaction_timeline.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_timelines/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
