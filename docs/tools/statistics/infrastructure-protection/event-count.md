---
page_title: f5xc_event_count - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Event count.
---

# Event Count

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Event counts over a period of time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-event-count-create` | L3l4 Event count. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `network_id` | NetworkId | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- event-count

## Example Usage

Ask Claude to help you work with Event Count resources:

### Create Event Count

> "Create a event-count named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/event_counts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/event_counts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/event_counts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @event_count.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/event_counts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
