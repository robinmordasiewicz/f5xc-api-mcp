---
page_title: f5xc_check - f5xc-api-mcp
subcategory: Shape
description: Check Peer Status.
---

# Check

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Check if the tenant has the peer or not.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-check-create` | Check Peer Status. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- check

## Example Usage

Ask Claude to help you work with Check resources:

### Create Check

> "Create a check named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/checks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/checks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/checks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @check.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/checks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
