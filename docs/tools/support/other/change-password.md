---
page_title: f5xc_change_password - f5xc-api-mcp
subcategory: Support
description: ChangePassword.
---

# Change Password

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Change host user password.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-change-password-create` | ChangePassword. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- change-password

## Example Usage

Ask Claude to help you work with Change Password resources:

### Create Change Password

> "Create a change-password named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/change_passwords" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/change_passwords/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/change_passwords" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @change_password.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/change_passwords/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
