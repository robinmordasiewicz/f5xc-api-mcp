---
page_title: f5xc_upgrade_sw - f5xc-api-mcp
subcategory: Sites
description: Upgrade SW.
---

# Upgrade Sw

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Upgrade Site SW version.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-upgrade-sw-create` | Upgrade SW. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Ce398` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- upgrade-sw

## Example Usage

Ask Claude to help you work with Upgrade Sw resources:

### Create Upgrade Sw

> "Create a upgrade-sw named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/upgrade_sws" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/upgrade_sws/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/upgrade_sws" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @upgrade_sw.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/upgrade_sws/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
