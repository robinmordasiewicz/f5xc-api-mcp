---
page_title: f5xc_pre_upgrade_check - f5xc-api-mcp
subcategory: Ce Management
description: Pre upgrade check.
---

# Pre Upgrade Check

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to check if site is ready for upgrade.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-pre-upgrade-check-get` | Pre upgrade check. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `sw_version` | Software version to upgrade to. | `-` |

## Example Usage

Ask Claude to help you work with Pre Upgrade Check resources:

### Get Pre Upgrade Check Details

> "Get details of the pre-upgrade-check named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pre_upgrade_checks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pre_upgrade_checks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pre_upgrade_checks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @pre_upgrade_check.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pre_upgrade_checks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
