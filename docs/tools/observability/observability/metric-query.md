---
page_title: f5xc_metric_query - f5xc-api-mcp
subcategory: Observability
description: GET Metric Query Data.
---

# Metric Query

Returns time series data of monitor metric query by region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-metric-query-create` | GET Metric Query Data. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Metric Query resources:

### Create Metric Query

> "Create a metric-query named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metric_querys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metric_querys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metric_querys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @metric_query.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metric_querys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
