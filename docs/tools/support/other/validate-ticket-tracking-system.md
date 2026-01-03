---
page_title: f5xc_validate_ticket_tracking_system - f5xc-api-mcp
subcategory: Support
description: Validate Ticket Tracking System.
---

# Validate Ticket Tracking System

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Validate input for the ticket tracking system like the credentials + organization.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-validate-ticket-tracking-system-create` | Validate Ticket Tracking System. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- validate-ticket-tracking-system

## Example Usage

Ask Claude to help you work with Validate Ticket Tracking System resources:

### Create Validate Ticket Tracking System

> "Create a validate-ticket-tracking-system named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_ticket_tracking_systems" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_ticket_tracking_systems/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_ticket_tracking_systems" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @validate_ticket_tracking_system.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_ticket_tracking_systems/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
