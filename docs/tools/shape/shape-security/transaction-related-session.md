---
page_title: f5xc_transaction_related_session - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionRelatedSessions.
---

# Transaction Related Session

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction related sessions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-related-session-create` | PostSafeTransactionRelatedSessions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-related-session

## Example Usage

Ask Claude to help you work with Transaction Related Session resources:

### Create Transaction Related Session

> "Create a transaction-related-session named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_related_sessions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_related_sessions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_related_sessions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @transaction_related_session.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_related_sessions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
