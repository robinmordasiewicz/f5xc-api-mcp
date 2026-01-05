---
page_title: f5xc_accept_to - f5xc-api-mcp
subcategory: Tenant And Identity
description: Accept TOS.
---

# Accept To

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Accept TOS updates version of accepted terms of service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-accept-to-create` | Accept TOS. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- accept-to

## Example Usage

Ask Claude to help you work with Accept To resources:

### Create Accept To

> "Create a accept-to named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/accept_tos" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/accept_tos/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/accept_tos" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @accept_to.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/accept_tos/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
