---
page_title: f5xc_customer_support - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create customer support ticket in managed tenant.
---

# Customer Support

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Creates a new customer support ticket in our customer support provider system.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-customer-support-create` | Create customer support ticket in managed tenant. |
| `f5xc-api-tenantandidentity-customer-support-list` | List tickets of managed tenant. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- customer-support

## Example Usage

Ask Claude to help you work with Customer Support resources:

### Create Customer Support

> "Create a customer-support named 'example' in the 'production' namespace"

### List Customer Supports

> "List all customer-supports in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create customer_support -n <namespace> -i customer_support.yaml

# Get
xcsh tenant_and_identity get customer_support <name> -n <namespace>

# List
xcsh tenant_and_identity list customer_support -n <namespace>

# Delete
xcsh tenant_and_identity delete customer_support <name> -n <namespace>
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
