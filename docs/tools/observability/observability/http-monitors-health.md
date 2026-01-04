---
page_title: f5xc_http_monitors_health - f5xc-api-mcp
subcategory: Observability
description: GET HTTP Monitor Health.
---

# HTTP Monitors Health

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns list of HTTP monitors in namespace with corresponding region health(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-http-monitors-health-create` | GET HTTP Monitor Health. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Demo` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- http-monitors-health

## Example Usage

Ask Claude to help you work with HTTP Monitors Health resources:

### Create HTTP Monitors Health

> "Create a http-monitors-health named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitors_healths" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitors_healths/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitors_healths" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @http_monitors_health.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/http_monitors_healths/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
