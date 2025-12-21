---
page_title: f5xc_close - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Close a customer support ticket in managed tenant.
---

# Close

Closes selected customer support ticket (if not already closed). You can always attempt to reopen if
needed to be.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-close-create` | Close a customer support ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `tp_id` | Third party ID |

## Example Usage

Ask Claude to help you work with Close resources:

### Create Close

> "Create a close named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create close -n <namespace> -i close.yaml

# Get
f5xcctl configuration get close -n <namespace> <name>

# List
f5xcctl configuration list close -n <namespace>

# Delete
f5xcctl configuration delete close -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_close" "example" {
  name      = "example-close"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
