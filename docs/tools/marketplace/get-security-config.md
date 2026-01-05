---
page_title: f5xc_get_security_config - f5xc-api-mcp
subcategory: Marketplace
description: GET Security Config for Third Party Application.
---

# Get Security Config

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Fetch the corresponding Security Config for the given Third Party Application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-get-security-config-create` | GET Security Config for Third Party Application. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-security-config

## Example Usage

Ask Claude to help you work with Get Security Config resources:

### Create Get Security Config

> "Create a get-security-config named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @get_security_config.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
