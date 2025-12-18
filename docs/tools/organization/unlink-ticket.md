---
page_title: f5xc_unlink_ticket - f5xc-api-mcp
subcategory: Organization
description: Unlink Tickets
---

# Unlink Ticket

Remove the Ticket from vulnerability in XC platform
External ticket systems will continue to have
the record

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-unlink-ticket-create` | Unlink Tickets |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Unlink Ticket resources:

### Create Unlink Ticket

> "Create a unlink-ticket named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f unlink_ticket.yaml

# Get
f5xcctl get unlink_ticket {name} -n {namespace}

# List
f5xcctl get unlink_tickets -n {namespace}

# Delete
f5xcctl delete unlink_ticket {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_unlink_ticket" "example" {
  name      = "example-unlink-ticket"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
