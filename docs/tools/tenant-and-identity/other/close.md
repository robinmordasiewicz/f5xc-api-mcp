---
page_title: f5xc_close - f5xc-api-mcp
subcategory: Tenant And Identity
description: Close a customer support ticket in managed tenant.
---

# Close

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Closes selected customer support ticket (if not already closed). You can always attempt to reopen if
needed to be.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-close-create` | Close a customer support ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tp_id` | Third party ID | `123` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- close

## Example Usage

Ask Claude to help you work with Close resources:

### Create Close

> "Create a close named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create close -n <namespace> -i close.yaml

# Get
xcsh tenant_and_identity get close <name> -n <namespace>

# List
xcsh tenant_and_identity list close -n <namespace>

# Delete
xcsh tenant_and_identity delete close <name> -n <namespace>
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
