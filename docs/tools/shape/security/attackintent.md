---
page_title: f5xc_attackintent - f5xc-api-mcp
subcategory: Shape
description: Top Malicious Bots by Attack Intent.
---

# Attackintent

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Top Malicious Bots by Attack Intent.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-attackintent-create` | Top Malicious Bots by Attack Intent. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- attackintent

## Example Usage

Ask Claude to help you work with Attackintent resources:

### Create Attackintent

> "Create a attackintent named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attackintents" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attackintents/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attackintents" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @attackintent.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/attackintents/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
