---
page_title: f5xc_aggregation - f5xc-api-mcp
subcategory: Statistics
description: Firewall Logs Aggregation Query.
---

# Aggregation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET summary/analytics data for the firewall logs that matches the query in request for a
given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-aggregation-create` | Firewall Logs Aggregation Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- aggregation

## Example Usage

Ask Claude to help you work with Aggregation resources:

### Create Aggregation

> "Create a aggregation named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aggregations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aggregations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aggregations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @aggregation.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/aggregations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
