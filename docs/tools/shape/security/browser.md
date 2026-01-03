---
page_title: f5xc_browser - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions Browser.
---

# Browser

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions Browser.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-browser-create` | Malicious Report Transactions Browser. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- browser

## Example Usage

Ask Claude to help you work with Browser resources:

### Create Browser

> "Create a browser named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/browsers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/browsers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/browsers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @browser.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/browsers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
