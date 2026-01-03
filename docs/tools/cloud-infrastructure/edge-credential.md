---
page_title: f5xc_edge_credential - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Cloud Credential.
---

# Edge Credential

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns the cloud credential for the matching edge type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-edge-credential-create` | Cloud Credential. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- edge-credential

## Example Usage

Ask Claude to help you work with Edge Credential resources:

### Create Edge Credential

> "Create a edge-credential named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/edge_credentials" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/edge_credentials/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/edge_credentials" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @edge_credential.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/edge_credentials/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
