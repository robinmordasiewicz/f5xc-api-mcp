---
page_title: f5xc_software_os_version - f5xc-api-mcp
subcategory: Service Mesh
description: GET OS based on SW_VERSION.
---

# Software Os Version

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET OS IMAGE based on the software version.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-software-os-version-create` | GET OS based on SW_VERSION. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- software-os-version

## Example Usage

Ask Claude to help you work with Software Os Version resources:

### Create Software Os Version

> "Create a software-os-version named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/software_os_versions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/software_os_versions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/software_os_versions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @software_os_version.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/software_os_versions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
