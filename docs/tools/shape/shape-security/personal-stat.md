---
page_title: f5xc_personal_stat - f5xc-api-mcp
subcategory: Shape
description: Insight Personal Stats.
---

# Personal Stat

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Insight Personal Stats.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-personal-stat-create` | Insight Personal Stats. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- personal-stat

## Example Usage

Ask Claude to help you work with Personal Stat resources:

### Create Personal Stat

> "Create a personal-stat named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/personal_stats" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/personal_stats/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/personal_stats" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @personal_stat.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/personal_stats/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
