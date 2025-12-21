---
page_title: f5xc_create_ticket - f5xc-api-mcp
subcategory: Networking
description: Create a ticket for a vulnerability.
---

# Create Ticket

Create a ticket for the given vulnerability.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-create-ticket-create` | Create a ticket for a vulnerability. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Create Ticket resources:

### Create Create Ticket

> "Create a create-ticket named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create create_ticket -n <namespace> -i create_ticket.yaml

# Get
f5xcctl configuration get create_ticket -n <namespace> <name>

# List
f5xcctl configuration list create_ticket -n <namespace>

# Delete
f5xcctl configuration delete create_ticket -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_create_ticket" "example" {
  name      = "example-create-ticket"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
