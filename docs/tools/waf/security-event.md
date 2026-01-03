---
page_title: f5xc_security_event - f5xc-api-mcp
subcategory: WAF
description: Client Security Events Metrics.
---

# Security Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET number of security events per client for a given namespace.
The security events counter can be
aggregated based on one or more labels listed here.
NAMESPACE, APP_TYPE, VIRTUAL_HOST, SITE,
SERVICE, INSTANCE, WAF_INSTANCE_ID, WAF_MODE.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-security-event-create` | Client Security Events Metrics. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- security-event

## Example Usage

Ask Claude to help you work with Security Event resources:

### Create Security Event

> "Create a security-event named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/security_events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/security_events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/security_events" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @security_event.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/security_events/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
