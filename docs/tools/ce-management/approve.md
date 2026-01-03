---
page_title: f5xc_approve - f5xc-api-mcp
subcategory: Ce Management
description: Registration Approve.
---

# Approve

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

RegistrationApprove approved pending registration and it can also decommission by changing state to
RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-approve-create` | Registration Approve. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `R-e9030963-639e-41cd-aba6-261504f4a6be.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- approve

## Example Usage

Ask Claude to help you work with Approve resources:

### Create Approve

> "Create a approve named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/approves" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/approves/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/approves" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @approve.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/approves/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
