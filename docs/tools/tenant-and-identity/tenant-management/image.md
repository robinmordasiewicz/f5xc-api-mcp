---
page_title: f5xc_image - f5xc-api-mcp
subcategory: Tenant And Identity
description: DELETE tenant profile image.
---

# Image

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Uploads new profile image for the tenant entity.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-image-list` | Tenant profile image. |
| `f5xc-api-tenantandidentity-image-update` | Update tenant profile image. |
| `f5xc-api-tenantandidentity-image-delete` | DELETE tenant profile image. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- image

**Deletes:**

- image
- contained_resources

## Example Usage

Ask Claude to help you work with Image resources:

### List Images

> "List all images in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/images" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/images/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/images" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @image.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/images/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
