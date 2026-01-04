---
page_title: f5xc_loadbalancer - f5xc-api-mcp
subcategory: WAF
description: Search load balancers All Namespaces.
---

# Loadbalancer

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET list of virtual hosts matching label filter.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-loadbalancer-create` | Search load balancers All Namespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- loadbalancer

## Example Usage

Ask Claude to help you work with Loadbalancer resources:

### Create Loadbalancer

> "Create a loadbalancer named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @loadbalancer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
