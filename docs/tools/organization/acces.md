---
page_title: f5xc_acces - f5xc-api-mcp
subcategory: Organization
description: Update Support Tenant Access
---

# Acces

This RPC can be used to manage user access for all flavors of support tenants currently
supported by
the platform. Use read-only, read-write with specific namespaces or
admin can specify custom groups
to control access by the support tenant user.
Name is well-known identifier for a specific support
related tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-acces-create` | Update Support Tenant Access |
| `f5xc-api-core-acces-list` | Get Support Tenant Access |

## Example Usage

Ask Claude to help you work with Acces resources:

### Create Acces

> "Create a acces named 'example' in the 'production' namespace"

### List Access

> "List all access in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f acces.yaml

# Get
f5xcctl get acces {name} -n {namespace}

# List
f5xcctl get access -n {namespace}

# Delete
f5xcctl delete acces {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_acces" "example" {
  name      = "example-acces"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
