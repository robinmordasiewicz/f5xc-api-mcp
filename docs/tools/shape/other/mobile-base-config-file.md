---
page_title: f5xc_mobile_base_config_file - f5xc-api-mcp
subcategory: Shape
description: GET Mobile Base Configuration File.
---

# Mobile Base Config File

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Mobile Base Configuration File.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-mobile-base-config-file-get` | GET Mobile Base Configuration File. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Mobile SDK Base Configuration name | `App 8000` |
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Mobile Base Config File resources:

### Get Mobile Base Config File Details

> "Get details of the mobile-base-config-file named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mobile_base_config_files" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mobile_base_config_files/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mobile_base_config_files" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @mobile_base_config_file.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mobile_base_config_files/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
