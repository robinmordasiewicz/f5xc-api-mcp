---
page_title: f5xc_create_http_load_balancer - f5xc-api-mcp
subcategory: Statistics
description: Create HTTP/HTTPS load balancer.
---

# Create HTTP Load Balancer

Create HTTP/HTTPS load balancer using the discovered virtual server as an origin server.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-create-http-load-balancer-create` | Create HTTP/HTTPS load balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `-` |
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Create HTTP Load Balancer resources:

### Create Create HTTP Load Balancer

> "Create a create-http-load-balancer named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_http_load_balancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_http_load_balancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_http_load_balancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @create_http_load_balancer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_http_load_balancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
