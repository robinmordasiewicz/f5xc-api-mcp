---
page_title: f5xc_evaluate_api_acces - f5xc-api-mcp
subcategory: Tenant And Identity
description: Evaluate API Access.
---

# Evaluate API Acces

EvaluateAPIAccess can evaluate multiple lists of API URL, method under a namespace for a given user
of a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-evaluate-api-acces-create` | Evaluate API Access. |

## Example Usage

Ask Claude to help you work with Evaluate API Acces resources:

### Create Evaluate API Acces

> "Create a evaluate-api-acces named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluate_api_access" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluate_api_access/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluate_api_access" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @evaluate_api_acces.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/evaluate_api_access/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
