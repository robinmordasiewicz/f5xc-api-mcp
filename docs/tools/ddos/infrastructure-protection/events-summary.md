---
page_title: f5xc_events_summary - f5xc-api-mcp
subcategory: Ddos
description: Simple events view.
---

# Events Summary

!!! info "Low Risk"
    Operations on this resource are generally safe.

Return a list of available event (suitable for an alert)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-events-summary-list` | Simple events view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `alert_id` | Optional - allows to filter events by alert so only relevant events are returned. If not provided, all user events are returned. | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |

## Example Usage

Ask Claude to help you work with Events Summary resources:

### List Events Summarys

> "List all events-summarys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events_summarys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @events_summary.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events_summarys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
