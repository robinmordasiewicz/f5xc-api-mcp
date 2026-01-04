---
page_title: f5xc_transaction_location - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionLocations.
---

# Transaction Location

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction locations.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-location-create` | PostSafeTransactionLocations. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-location

## Example Usage

Ask Claude to help you work with Transaction Location resources:

### Create Transaction Location

> "Create a transaction-location named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_locations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_locations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_locations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @transaction_location.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transaction_locations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
