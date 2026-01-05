---
page_title: f5xc_match - f5xc-api-mcp
subcategory: Statistics
description: GET Alert Policy Match.
---

# Match

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Alert Policies that match to a set of alert labels for a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-match-create` | GET Alert Policy Match. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- match

## Example Usage

Ask Claude to help you work with Match resources:

### Create Match

> "Create a match named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matchs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matchs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matchs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @match.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/matchs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
