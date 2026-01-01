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
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create-ticket

## Example Usage

Ask Claude to help you work with Create Ticket resources:

### Create Create Ticket

> "Create a create-ticket named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create create_ticket -n <namespace> -i create_ticket.yaml

# Get
xcsh virtual get create_ticket <name> -n <namespace>

# List
xcsh virtual list create_ticket -n <namespace>

# Delete
xcsh virtual delete create_ticket <name> -n <namespace>
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
