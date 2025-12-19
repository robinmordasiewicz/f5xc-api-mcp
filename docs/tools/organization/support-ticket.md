---
page_title: f5xc_support_ticket - f5xc-api-mcp
subcategory: Organization
description: List of support tickets created for a child tenant
---

# Support Ticket

Return list of support tickets for a given child tenant
Note: Direct API access is restricted.
Client needs to use the /managed_tenant/<mt_identifier>/ prefix in the URL to
get the support ticket
list for child tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-support-ticket-create` | List of support tickets created for a child tenant |

## Example Usage

Ask Claude to help you work with Support Ticket resources:

### Create Support Ticket

> "Create a support-ticket named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create support_ticket -n <namespace> -i support_ticket.yaml

# Get
f5xcctl configuration get support_ticket -n <namespace> <name>

# List
f5xcctl configuration list support_ticket -n <namespace>

# Delete
f5xcctl configuration delete support_ticket -n <namespace> <name>
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
