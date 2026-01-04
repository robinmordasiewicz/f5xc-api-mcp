---
page_title: f5xc_state - f5xc-api-mcp
subcategory: Sites
description: Set site state.
---

# State

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request changing site state but this request goes through validation as some
trainsitions are not
allowed.
It can be used to decomission site by sending state DECOMISSIONING. Example of
forbidden
state is PROVISIONING and UPGRADING.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-state-create` | Set site state. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Ce398` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- state

## Example Usage

Ask Claude to help you work with State resources:

### Create State

> "Create a state named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/states" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/states/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/states" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @state.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/states/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
