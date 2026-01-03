---
page_title: f5xc_tcpdump - f5xc-api-mcp
subcategory: Support
description: Tcpdump
---

# Tcpdump

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run tcpdump on an interface in a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-tcpdump-create` | Tcpdump |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- tcpdump

## Example Usage

Ask Claude to help you work with Tcpdump resources:

### Create Tcpdump

> "Create a tcpdump named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcpdumps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcpdumps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcpdumps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @tcpdump.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tcpdumps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
