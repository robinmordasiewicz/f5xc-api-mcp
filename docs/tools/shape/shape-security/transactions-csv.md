---
page_title: f5xc_transactions_csv - f5xc-api-mcp
subcategory: Shape
description: GET SAFE Analyst Transactions as a CSV file.
---

# Transactions Csv

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Safe transactions as CSV file.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transactions-csv-create` | GET SAFE Analyst Transactions as a CSV file. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transactions-csv

## Example Usage

Ask Claude to help you work with Transactions Csv resources:

### Create Transactions Csv

> "Create a transactions-csv named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_csvs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_csvs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_csvs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @transactions_csv.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transactions_csvs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
