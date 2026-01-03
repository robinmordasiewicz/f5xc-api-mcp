---
page_title: f5xc_metric - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: All Cloud Connect Metrics.
---

# Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Cloud Connect APIs are used to GET the data for cloud connect.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-metric-create` | All Cloud Connect Metrics. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- metric

## Example Usage

Ask Claude to help you work with Metric resources:

### Create Metric

> "Create a metric named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metrics" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metrics/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metrics" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @metric.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/metrics/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
