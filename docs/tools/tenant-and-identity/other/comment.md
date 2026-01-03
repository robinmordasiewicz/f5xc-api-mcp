---
page_title: f5xc_comment - f5xc-api-mcp
subcategory: Tenant And Identity
description: Add comment to a customer support ticket in managed tenant.
---

# Comment

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Adds additional comment to a specified customer support ticket. The comment may include an
attachment.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-comment-create` | Add comment to a customer support ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tp_id` | Third party ID | `123` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- comment

## Example Usage

Ask Claude to help you work with Comment resources:

### Create Comment

> "Create a comment named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/comments" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/comments/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/comments" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @comment.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/comments/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
