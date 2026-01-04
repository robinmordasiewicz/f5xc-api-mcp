---
page_title: f5xc_monitor_event - f5xc-api-mcp
subcategory: Observability
description: GET Monitor Events.
---

# Monitor Event

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the healthy and critical events for the specified monitor.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-monitor-event-list` | GET Monitor Events. |

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

## Example Usage

Ask Claude to help you work with Monitor Event resources:

### List Monitor Events

> "List all monitor-events in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @monitor_event.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/monitor_events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
