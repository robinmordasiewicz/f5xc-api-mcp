---
page_title: f5xc_http_monitor_detail - f5xc-api-mcp
subcategory: Observability
description: GET HTTP Monitor Detail.
---

# HTTP Monitor Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the monitor latency, trend, and health by region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-http-monitor-detail-list` | GET HTTP Monitor Detail. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End_time. | `-` |
| `monitor_name` | Monitor_name. X-required | `-` |
| `start_time` | Start_time. X-required | `-` |

## Example Usage

Ask Claude to help you work with HTTP Monitor Detail resources:

### List HTTP Monitor Details

> "List all http-monitor-details in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitor_details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitor_details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitor_details" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @http_monitor_detail.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitor_details/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
