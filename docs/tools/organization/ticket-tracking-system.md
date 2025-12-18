---
page_title: f5xc_ticket_tracking_system - f5xc-api-mcp
subcategory: Organization
description: Create Ticket Tracking System
---

# Ticket Tracking System

List the set of ticket_tracking_system in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-ticket-tracking-system-create` | Create Ticket Tracking System |
| `f5xc-api-core-ticket-tracking-system-get` | Get Ticket Tracking System |
| `f5xc-api-core-ticket-tracking-system-list` | List Ticket Tracking System |
| `f5xc-api-core-ticket-tracking-system-update` | Replace Ticket Tracking System |
| `f5xc-api-core-ticket-tracking-system-delete` | Delete Ticket Tracking System |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Ticket Tracking System resources:

### Create Ticket Tracking System

> "Create a ticket-tracking-system named 'example' in the 'production' namespace"

### List Ticket Tracking Systems

> "List all ticket-tracking-systems in the 'production' namespace"

### Get Ticket Tracking System Details

> "Get details of the ticket-tracking-system named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f ticket_tracking_system.yaml

# Get
f5xcctl get ticket_tracking_system {name} -n {namespace}

# List
f5xcctl get ticket_tracking_systems -n {namespace}

# Delete
f5xcctl delete ticket_tracking_system {name} -n {namespace}
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
