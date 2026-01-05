---
page_title: f5xc_by_mitigation - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Mitigation Traffic Query.
---

# By Mitigation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Mitigation Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-by-mitigation-create` | L3l4 Mitigation Traffic Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `mitigation_id` | MitigationId | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- by-mitigation

## Example Usage

Ask Claude to help you work with By Mitigation resources:

### Create By Mitigation

> "Create a by-mitigation named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/by_mitigations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/by_mitigations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/by_mitigations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @by_mitigation.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/by_mitigations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
