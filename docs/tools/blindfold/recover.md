---
page_title: f5xc_recover - f5xc-api-mcp
subcategory: Blindfold
description: Recover secret policy with given policy name.
---

# Recover

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Recoverpolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-recover-create` | Recover secret policy with given policy name. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- recover

## Example Usage

Ask Claude to help you work with Recover resources:

### Create Recover

> "Create a recover named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/recovers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/recovers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/recovers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @recover.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/recovers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
