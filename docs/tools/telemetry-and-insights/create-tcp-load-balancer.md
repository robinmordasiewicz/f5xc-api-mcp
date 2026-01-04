---
page_title: f5xc_create_tcp_load_balancer - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Create TCP load balancer.
---

# Create TCP Load Balancer

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create TCP load balancer using the discovered virtual server as an origin server.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-create-tcp-load-balancer-create` | Create TCP load balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `Vs1` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create-tcp-load-balancer

## Example Usage

Ask Claude to help you work with Create TCP Load Balancer resources:

### Create Create TCP Load Balancer

> "Create a create-tcp-load-balancer named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tcp_load_balancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tcp_load_balancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tcp_load_balancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @create_tcp_load_balancer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tcp_load_balancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
