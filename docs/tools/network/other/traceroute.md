---
page_title: f5xc_traceroute - f5xc-api-mcp
subcategory: Network
description: Traceroute.
---

# Traceroute

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run traceroute to a destination.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-traceroute-create` | Traceroute. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- traceroute

## Example Usage

Ask Claude to help you work with Traceroute resources:

### Create Traceroute

> "Create a traceroute named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/traceroutes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/traceroutes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/traceroutes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @traceroute.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/traceroutes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
