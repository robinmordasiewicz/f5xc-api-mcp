---
page_title: f5xc_ticket_tracking_system - f5xc-api-mcp
subcategory: Support
description: Create Ticket Tracking System.
---

# Ticket Tracking System

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of ticket_tracking_system in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-ticket-tracking-system-create` | Create Ticket Tracking System. |
| `f5xc-api-support-ticket-tracking-system-get` | GET Ticket Tracking System. |
| `f5xc-api-support-ticket-tracking-system-list` | List Ticket Tracking System. |
| `f5xc-api-support-ticket-tracking-system-update` | Replace Ticket Tracking System. |
| `f5xc-api-support-ticket-tracking-system-delete` | DELETE Ticket Tracking System. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ticket-tracking-system

**Modifies:**

- ticket-tracking-system

**Deletes:**

- ticket-tracking-system
- contained_resources

## Example Usage

Ask Claude to help you work with Ticket Tracking System resources:

### Create Ticket Tracking System

> "Create a ticket-tracking-system named 'example' in the 'production' namespace"

### List Ticket Tracking Systems

> "List all ticket-tracking-systems in the 'production' namespace"

### Get Ticket Tracking System Details

> "Get details of the ticket-tracking-system named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ticket_tracking_systems" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ticket_tracking_systems/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ticket_tracking_systems" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @ticket_tracking_system.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/ticket_tracking_systems/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
