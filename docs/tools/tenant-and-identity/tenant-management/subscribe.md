---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Tenant And Identity
description: Subscribe Delegated Access Addon Service.
---

# Subscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe Delegated Access addon service feature. A support request will be created and feature will
be enabled upon approval.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-subscribe-create` | Subscribe Delegated Access Addon Service. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- subscribe

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create subscribe -n <namespace> -i subscribe.yaml

# Get
xcsh tenant_and_identity get subscribe <name> -n <namespace>

# List
xcsh tenant_and_identity list subscribe -n <namespace>

# Delete
xcsh tenant_and_identity delete subscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_subscribe" "example" {
  name      = "example-subscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
