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

## xcsh Equivalent

```bash
# Create/Update
xcsh support create support_ticket -n <namespace> -i support_ticket.yaml

# Get
xcsh support get support_ticket <name> -n <namespace>

# List
xcsh support list support_ticket -n <namespace>

# Delete
xcsh support delete support_ticket <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_support_ticket" "example" {
  name      = "example-support-ticket"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
