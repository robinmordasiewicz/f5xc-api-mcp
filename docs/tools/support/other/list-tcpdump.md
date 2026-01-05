---
page_title: f5xc_list_tcpdump - f5xc-api-mcp
subcategory: Support
description: List Tcpdump.
---

# List Tcpdump

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List tcpdump capture status on a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-list-tcpdump-create` | List Tcpdump. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `site` | Site Name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-tcpdump

## Example Usage

Ask Claude to help you work with List Tcpdump resources:

### Create List Tcpdump

> "Create a list-tcpdump named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_tcpdumps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_tcpdumps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_tcpdumps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @list_tcpdump.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_tcpdumps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
