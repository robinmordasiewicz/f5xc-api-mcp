---
page_title: f5xc_create_ticket - f5xc-api-mcp
subcategory: Virtual
description: Create a ticket for a vulnerability.
---

# Create Ticket

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create a ticket for the given vulnerability.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-create-ticket-create` | Create a ticket for a vulnerability. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create-ticket

## Example Usage

Ask Claude to help you work with Create Ticket resources:

### Create Create Ticket

> "Create a create-ticket named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tickets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tickets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tickets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @create_ticket.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/create_tickets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
