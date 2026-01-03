---
page_title: f5xc_listregistrationsbystate - f5xc-api-mcp
subcategory: Ce Management
description: List Registrations By State.
---

# Listregistrationsbystate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API endpoint for returning Registrations by status, e.g APPROVED, NEW, or RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-listregistrationsbystate-create` | List Registrations By State. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- listregistrationsbystate

## Example Usage

Ask Claude to help you work with Listregistrationsbystate resources:

### Create Listregistrationsbystate

> "Create a listregistrationsbystate named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/listregistrationsbystates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/listregistrationsbystates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/listregistrationsbystates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @listregistrationsbystate.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/listregistrationsbystates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
