---
page_title: f5xc_latency - f5xc-api-mcp
subcategory: Network Security
description: Service Policy Latency.
---

# Latency

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET the average latency for Service policy evaluation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-latency-create` | Service Policy Latency. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- latency

## Example Usage

Ask Claude to help you work with Latency resources:

### Create Latency

> "Create a latency named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/latencys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/latencys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/latencys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @latency.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/latencys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
