---
page_title: f5xc_all_ns_service - f5xc-api-mcp
subcategory: Statistics
description: Service Graph Query All Namespaces.
---

# All Ns Service

Request to GET monitoring data for a service mesh of a given application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-all-ns-service-create` | Service Graph Query All Namespaces. |

## Example Usage

Ask Claude to help you work with All Ns Service resources:

### Create All Ns Service

> "Create a all-ns-service named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_services" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @all_ns_service.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/all_ns_services/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
