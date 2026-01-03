---
page_title: f5xc_query - f5xc-api-mcp
subcategory: AI Services
description: AI Assistant Query.
---

# Query

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-aiservices-query-create` | AI Assistant Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- query

## Example Usage

Ask Claude to help you work with Query resources:

### Create Query

> "Create a query named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/querys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/querys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/querys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @query.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/querys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
