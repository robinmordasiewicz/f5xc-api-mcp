---
page_title: f5xc_tcp_loadbalancer - f5xc-api-mcp
subcategory: Virtual
description: Create TCP Load Balancer.
---

# TCP Loadbalancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the TCP load balancer replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-tcp-loadbalancer-create` | Create TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-get` | GET TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-list` | List Configure TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-update` | Replace TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-delete` | DELETE Configure TCP Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- tcp-loadbalancer

**Modifies:**

- tcp-loadbalancer

**Deletes:**

- tcp-loadbalancer
- contained_resources

## Example Usage

Ask Claude to help you work with TCP Loadbalancer resources:

### Create TCP Loadbalancer

> "Create a tcp-loadbalancer named 'example' in the 'production' namespace"

### List TCP Loadbalancers

> "List all tcp-loadbalancers in the 'production' namespace"

### Get TCP Loadbalancer Details

> "Get details of the tcp-loadbalancer named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcp_loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcp_loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcp_loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @tcp_loadbalancer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcp_loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
