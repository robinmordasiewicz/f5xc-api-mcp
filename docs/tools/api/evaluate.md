---
page_title: f5xc_evaluate - f5xc-api-mcp
subcategory: API
description: Evaluate API Group.
---

# Evaluate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Evaluate API Group Builder against all API endpoints associated with the referenced object and
return the resulting API Group.
For example, if the referenced object is an HTTP LB then all
discovered and imported endpoints are associated with it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-evaluate-create` | Evaluate API Group. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- evaluate

## Example Usage

Ask Claude to help you work with Evaluate resources:

### Create Evaluate

> "Create a evaluate named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @evaluate.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
