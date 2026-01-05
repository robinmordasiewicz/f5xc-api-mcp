---
page_title: f5xc_metric - f5xc-api-mcp
subcategory: Network
description: Metrics
---

# Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DC Cluster Group metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-metric-create` | Metrics |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

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
