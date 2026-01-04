---
page_title: f5xc_source_summary - f5xc-api-mcp
subcategory: Observability
description: GET Source Summary.
---

# Source Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the healthy and critical status count, latency, and coordinates for each source region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-source-summary-list` | GET Source Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `label_filter` | Label_filter. | `F5 XC/country in (VES-I/O-usa), F5 XC/siteType=VES-I/O-RE.` |
| `monitor_name` | Monitor_name. | `Monitor1` |
| `monitor_type` | Monitor_type. X-required | `HTTP` |

## Example Usage

Ask Claude to help you work with Source Summary resources:

### List Source Summarys

> "List all source-summarys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/source_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/source_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/source_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @source_summary.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/source_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
