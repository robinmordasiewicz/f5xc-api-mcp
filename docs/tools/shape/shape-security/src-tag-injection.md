---
page_title: f5xc_src_tag_injection - f5xc-api-mcp
subcategory: Shape
description: Validate JS Injection.
---

# Src Tag Injection

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Validate js src tag injection in the target URL.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-src-tag-injection-create` | Validate JS Injection. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- src-tag-injection

## Example Usage

Ask Claude to help you work with Src Tag Injection resources:

### Create Src Tag Injection

> "Create a src-tag-injection named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/src_tag_injections" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/src_tag_injections/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/src_tag_injections" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @src_tag_injection.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/src_tag_injections/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
