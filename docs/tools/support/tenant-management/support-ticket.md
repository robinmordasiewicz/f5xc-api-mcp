---
page_title: f5xc_support_ticket - f5xc-api-mcp
subcategory: Support
description: List of support tickets created for a child tenant.
---

# Support Ticket

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Return list of support tickets for a given child tenant
Note: Direct API access is restricted.
Client needs to use the /managed_tenant/<mt_identifier>/ prefix in the URL to
GET the support ticket
list for child tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-support-ticket-create` | List of support tickets created for a child tenant. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- support-ticket

## Example Usage

Ask Claude to help you work with Support Ticket resources:

### Create Support Ticket

> "Create a support-ticket named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/support_tickets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/support_tickets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/support_tickets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @support_ticket.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/support_tickets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
