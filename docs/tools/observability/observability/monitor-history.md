---
page_title: f5xc_monitor_history - f5xc-api-mcp
subcategory: Observability
description: GET Monitor History.
---

# Monitor History

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the healthy and critical statuses for the specified monitor.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-monitor-history-list` | GET Monitor History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End_time. | `2020-11-17T13:41:49.083255Z.` |
| `monitor_name` | Monitor_name. X-required | `Monitor1` |
| `monitor_type` | Monitor_type. X-required | `HTTP` |
| `start_time` | Start_time. X-required | `2020-11-17T12:41:49.083255Z.` |
| `step_size` | Step_size. | `30s` |

## Example Usage

Ask Claude to help you work with Monitor History resources:

### List Monitor Historys

> "List all monitor-historys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @monitor_history.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
