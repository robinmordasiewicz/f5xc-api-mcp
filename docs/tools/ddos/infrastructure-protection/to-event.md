---
page_title: f5xc_to_event - f5xc-api-mcp
subcategory: Ddos
description: Link Alert to Event.
---

# To Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Allows customers to link alerts with events. This helps with tracking of any mitigation activity and
event investigation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-to-event-update` | Link Alert to Event. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `alert_id` | Alert ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- to-event

## Example Usage

Ask Claude to help you work with To Event resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/to_events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/to_events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/to_events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @to_event.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/to_events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
