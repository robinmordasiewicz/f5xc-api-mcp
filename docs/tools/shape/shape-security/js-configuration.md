---
page_title: f5xc_js_configuration - f5xc-api-mcp
subcategory: Shape
description: GET JS Injection Configuration.
---

# Js Configuration

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET JS Injection Configuration for this tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-js-configuration-list` | GET JS Injection Configuration. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Format we want the script to be returned in. | `ScriptTag` |

## Example Usage

Ask Claude to help you work with Js Configuration resources:

### List Js Configurations

> "List all js-configurations in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/js_configurations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/js_configurations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/js_configurations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @js_configuration.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/js_configurations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
