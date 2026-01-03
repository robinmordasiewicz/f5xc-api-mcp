---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: CDN
description: Subscribe to CDN Loadbalancer.
---

# Subscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe to CDN Loadbalancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-subscribe-create` | Subscribe to CDN Loadbalancer. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- subscribe

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/subscribes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/subscribes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/subscribes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @subscribe.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/subscribes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
