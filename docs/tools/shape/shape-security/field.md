---
page_title: f5xc_field - f5xc-api-mcp
subcategory: Shape
description: Forensic Fields.
---

# Field

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-field-create` | Forensic Fields. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- field

## Example Usage

Ask Claude to help you work with Field resources:

### Create Field

> "Create a field named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fields" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fields/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fields" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @field.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/fields/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
