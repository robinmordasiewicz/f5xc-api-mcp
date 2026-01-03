---
page_title: f5xc_l7ddos_rps_threshold - f5xc-api-mcp
subcategory: Virtual
description: Set L7 DDoS RPS Threshold.
---

# L7ddos Rps Threshold

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Sets the L7 DDoS RPS threshold for HTTP load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-l7ddos-rps-threshold-create` | Set L7 DDoS RPS Threshold. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Lb_name` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- l7ddos-rps-threshold

## Example Usage

Ask Claude to help you work with L7ddos Rps Threshold resources:

### Create L7ddos Rps Threshold

> "Create a l7ddos-rps-threshold named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/l7ddos_rps_thresholds" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/l7ddos_rps_thresholds/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/l7ddos_rps_thresholds" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @l7ddos_rps_threshold.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/l7ddos_rps_thresholds/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
