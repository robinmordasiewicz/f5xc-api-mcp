---
page_title: f5xc_service - f5xc-api-mcp
subcategory: Sites
description: Service List.
---

# Service

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of services for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-service-list` | Service List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `site` | Site | `-` |

## Example Usage

Ask Claude to help you work with Service resources:

### List Services

> "List all services in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @service.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
