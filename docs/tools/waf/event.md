---
page_title: f5xc_event - f5xc-api-mcp
subcategory: WAF
description: Security Events Query.
---

# Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET security events for the given namespace.
For `system` namespace, all security events for the
tenant matching the query specified
in the request will be returned in the response. User may query
security events that matches various
fields such as `vh_name`, `sec_event_type`, `src_site`, `city`,
`country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-event-create` | Security Events Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- event

## Example Usage

Ask Claude to help you work with Event resources:

### Create Event

> "Create a event named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @event.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
