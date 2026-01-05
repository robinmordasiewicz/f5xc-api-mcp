---
page_title: f5xc_update_domain - f5xc-api-mcp
subcategory: Shape
description: Update Domains.
---

# Update Domain

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update domain from mitigated domains to allowed domains and vice versa.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-update-domain-create` | Update Domains. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-domain

## Example Usage

Ask Claude to help you work with Update Domain resources:

### Create Update Domain

> "Create a update-domain named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_domains" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @update_domain.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_domains/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
