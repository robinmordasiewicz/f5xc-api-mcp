---
page_title: f5xc_asorg - f5xc-api-mcp
subcategory: Shape
description: Top Malicious Bots by ASOrg.
---

# Asorg

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top malicious bots by AS Organization.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-asorg-create` | Top Malicious Bots by ASOrg. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- asorg

## Example Usage

Ask Claude to help you work with Asorg resources:

### Create Asorg

> "Create a asorg named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asorgs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asorgs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asorgs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @asorg.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/asorgs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
