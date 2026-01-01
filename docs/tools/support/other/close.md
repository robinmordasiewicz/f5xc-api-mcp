---
page_title: f5xc_close - f5xc-api-mcp
subcategory: Support
description: Close a customer support ticket.
---

# Close

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Closes selected customer support ticket (if not already closed). You can always attempt to reopen if
needed to be.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-close-create` | Close a customer support ticket. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Value` |

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
xcsh support create close -n <namespace> -i close.yaml

# Get
xcsh support get close <name> -n <namespace>

# List
xcsh support list close -n <namespace>

# Delete
xcsh support delete close <name> -n <namespace>
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
