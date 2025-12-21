---
page_title: f5xc_unsubscribe - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Unsubscribe Delegated Access Addon Service.
---

# Unsubscribe

Unsubscribe Delegated Access addon service feature. A support request will be created and request
will be processed upon approval.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-unsubscribe-create` | Unsubscribe Delegated Access Addon Service. |

## Example Usage

Ask Claude to help you work with Unsubscribe resources:

### Create Unsubscribe

> "Create a unsubscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create unsubscribe -n <namespace> -i unsubscribe.yaml

# Get
f5xcctl tenant_management get unsubscribe <name> -n <namespace>

# List
f5xcctl tenant_management list unsubscribe -n <namespace>

# Delete
f5xcctl tenant_management delete unsubscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unsubscribe" "example" {
  name      = "example-unsubscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
