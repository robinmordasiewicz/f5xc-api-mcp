---
page_title: f5xc_loadbalancer - f5xc-api-mcp
subcategory: API
description: GET Referencing Loadbalancers.
---

# Loadbalancer

!!! info "Low Risk"
    Operations on this resource are generally safe.

List Loadbalancers referenced by the API Definition (backrefrences).

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-loadbalancer-get` | GET Referencing Loadbalancers. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Loadbalancer resources:

### Get Loadbalancer Details

> "Get details of the loadbalancer named 'example' in namespace 'production'"

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
