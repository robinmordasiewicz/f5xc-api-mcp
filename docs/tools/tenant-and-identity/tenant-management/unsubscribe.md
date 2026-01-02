---
page_title: f5xc_unsubscribe - f5xc-api-mcp
subcategory: Tenant And Identity
description: Unsubscribe Delegated Access Addon Service.
---

# Unsubscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Unsubscribe Delegated Access addon service feature. A support request will be created and request
will be processed upon approval.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-unsubscribe-create` | Unsubscribe Delegated Access Addon Service. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unsubscribe

## Example Usage

Ask Claude to help you work with Unsubscribe resources:

### Create Unsubscribe

> "Create a unsubscribe named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create unsubscribe -n <namespace> -i unsubscribe.yaml

# Get
xcsh tenant_and_identity get unsubscribe <name> -n <namespace>

# List
xcsh tenant_and_identity list unsubscribe -n <namespace>

# Delete
xcsh tenant_and_identity delete unsubscribe <name> -n <namespace>
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
