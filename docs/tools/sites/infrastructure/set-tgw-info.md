---
page_title: f5xc_set_tgw_info - f5xc-api-mcp
subcategory: Sites
description: Configure TGW Information.
---

# Set Tgw Info

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure TGW Information like tgw-ID, F5 Distributed Cloud site's VPC-ID.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-tgw-info-create` | Configure TGW Information. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-tgw-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-tgw-info

## Example Usage

Ask Claude to help you work with Set Tgw Info resources:

### Create Set Tgw Info

> "Create a set-tgw-info named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_tgw_infos" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_tgw_infos/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_tgw_infos" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @set_tgw_info.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_tgw_infos/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
