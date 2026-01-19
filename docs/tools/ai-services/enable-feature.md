---
page_title: f5xc_enable_feature - f5xc-api-mcp
subcategory: AI Services
description: Enable feature.
---

# Enable Feature

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-aiservices-enable-feature-create` | Enable feature. |

## Example Usage

Ask Claude to help you work with Enable Feature resources:

### Create Enable Feature

> "Create a enable-feature named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_features" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_features/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_features" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @enable_feature.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_features/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
