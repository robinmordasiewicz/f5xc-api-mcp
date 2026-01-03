---
page_title: f5xc_gettransactiondata - f5xc-api-mcp
subcategory: Shape
description: GetTransactionData.
---

# Gettransactiondata

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Transaction data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettransactiondata-create` | GetTransactionData. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettransactiondata

## Example Usage

Ask Claude to help you work with Gettransactiondata resources:

### Create Gettransactiondata

> "Create a gettransactiondata named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettransactiondatas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettransactiondatas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettransactiondatas" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @gettransactiondata.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettransactiondatas/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
