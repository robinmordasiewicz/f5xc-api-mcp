---
page_title: f5xc_segment_metric - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: All Cloud Connect Segment Metrics.
---

# Segment Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Cloud Connect APIs are used to GET the segment data for cloud connect.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-segment-metric-create` | All Cloud Connect Segment Metrics. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- segment-metric

## Example Usage

Ask Claude to help you work with Segment Metric resources:

### Create Segment Metric

> "Create a segment-metric named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/segment_metrics" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/segment_metrics/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/segment_metrics" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @segment_metric.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/segment_metrics/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
