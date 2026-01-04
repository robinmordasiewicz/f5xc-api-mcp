---
page_title: f5xc_softdelete - f5xc-api-mcp
subcategory: Blindfold
description: DELETE secret policy with given policy name.
---

# Softdelete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Deletepolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-softdelete-create` | DELETE secret policy with given policy name. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Site-secret-policy.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- softdelete

## Example Usage

Ask Claude to help you work with Softdelete resources:

### Create Softdelete

> "Create a softdelete named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/softdeletes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/softdeletes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/softdeletes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @softdelete.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/softdeletes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
