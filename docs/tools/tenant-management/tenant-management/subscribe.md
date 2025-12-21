---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Subscribe Delegated Access Addon Service.
---

# Subscribe

Subscribe Delegated Access addon service feature. A support request will be created and feature will
be enabled upon approval.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-subscribe-create` | Subscribe Delegated Access Addon Service. |

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl tenant_management get subscribe <name> -n <namespace>

# List
f5xcctl tenant_management list subscribe -n <namespace>

# Delete
f5xcctl tenant_management delete subscribe <name> -n <namespace>
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
