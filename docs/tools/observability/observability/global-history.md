---
page_title: f5xc_global_history - f5xc-api-mcp
subcategory: Observability
description: GET Global History.
---

# Global History

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns a time series of critical monitor counts in namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-global-history-list` | GET Global History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | End_time. | `2020-11-17T13:41:49.083255Z.` |
| `monitor_type` | Monitor_type. | `HTTP` |
| `start_time` | Start_time. | `2020-11-17T12:41:49.083255Z.` |
| `step_size` | Step_size. | `300s` |

## Example Usage

Ask Claude to help you work with Global History resources:

### List Global Historys

> "List all global-historys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @global_history.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/global_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
