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
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
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

## xcsh Equivalent

```bash
# Create/Update
xcsh support create ticket_tracking_system -n <namespace> -i ticket_tracking_system.yaml

# Get
xcsh support get ticket_tracking_system <name> -n <namespace>

# List
xcsh support list ticket_tracking_system -n <namespace>

# Delete
xcsh support delete ticket_tracking_system <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ticket_tracking_system" "example" {
  name      = "example-ticket-tracking-system"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
