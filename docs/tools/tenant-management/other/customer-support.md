---
page_title: f5xc_customer_support - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Create customer support ticket in managed tenant.
---

# Customer Support

Creates a new customer support ticket in our customer support provider system.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-customer-support-create` | Create customer support ticket in managed tenant. |
| `f5xc-api-tenantmanagement-customer-support-list` | List tickets of managed tenant. |

## Example Usage

Ask Claude to help you work with Customer Support resources:

### Create Customer Support

> "Create a customer-support named 'example' in the 'production' namespace"

### List Customer Supports

> "List all customer-supports in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create customer_support -n <namespace> -i customer_support.yaml

# Get
f5xcctl tenant_management get customer_support <name> -n <namespace>

# List
f5xcctl tenant_management list customer_support -n <namespace>

# Delete
f5xcctl tenant_management delete customer_support <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_customer_support" "example" {
  name      = "example-customer-support"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
