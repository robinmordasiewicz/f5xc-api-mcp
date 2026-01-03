---
page_title: f5xc_registerBootstrap - f5xc-api-mcp
subcategory: Ce Management
description: Registration Create.
---

# RegisterBootstrap

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Registration request to create registration is sent by the node on first boot. User never creates
registration on her own.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-registerbootstrap-create` | Registration Create. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- registerBootstrap

## Example Usage

Ask Claude to help you work with RegisterBootstrap resources:

### Create RegisterBootstrap

> "Create a registerBootstrap named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registerBootstraps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registerBootstraps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registerBootstraps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @registerBootstrap.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registerBootstraps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
