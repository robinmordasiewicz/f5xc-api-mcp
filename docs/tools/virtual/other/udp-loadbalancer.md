---
page_title: f5xc_udp_loadbalancer - f5xc-api-mcp
subcategory: Virtual
description: Create UDP Load Balancer.
---

# UDP Loadbalancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the UDP load balancer replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-udp-loadbalancer-create` | Create UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-get` | GET UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-list` | List Configure UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-update` | Replace UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-delete` | DELETE Configure UDP Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- udp-loadbalancer

**Modifies:**

- udp-loadbalancer

**Deletes:**

- udp-loadbalancer
- contained_resources

## Example Usage

Ask Claude to help you work with UDP Loadbalancer resources:

### Create UDP Loadbalancer

> "Create a udp-loadbalancer named 'example' in the 'production' namespace"

### List UDP Loadbalancers

> "List all udp-loadbalancers in the 'production' namespace"

### Get UDP Loadbalancer Details

> "Get details of the udp-loadbalancer named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/udp_loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/udp_loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/udp_loadbalancers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @udp_loadbalancer.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/udp_loadbalancers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
