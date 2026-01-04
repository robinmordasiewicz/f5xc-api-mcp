---
page_title: f5xc_dns_monitor_summary - f5xc-api-mcp
subcategory: Observability
description: GET DNS Monitor Summary.
---

# DNS Monitor Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the DNS monitor health status, latency, and trend.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-dns-monitor-summary-list` | GET DNS Monitor Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End_time. | `2020-11-17T13:41:49.083255Z.` |
| `monitor_name` | Monitor_name. | `Monitor1` |
| `start_time` | Start_time. X-required | `2020-11-17T12:41:49.083255Z.` |

## Example Usage

Ask Claude to help you work with DNS Monitor Summary resources:

### List DNS Monitor Summarys

> "List all dns-monitor-summarys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitor_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitor_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitor_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dns_monitor_summary.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dns_monitor_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
