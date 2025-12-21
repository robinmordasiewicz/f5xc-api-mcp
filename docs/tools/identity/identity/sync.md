---
page_title: f5xc_sync - f5xc-api-mcp
subcategory: Identity
description: Sync user
---

# Sync

In case when user created initially from identity provider we need to sync the user data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-sync-create` | Sync user |

## Example Usage

Ask Claude to help you work with Sync resources:

### Create Sync

> "Create a sync named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create sync -n <namespace> -i sync.yaml

# Get
f5xcctl configuration get sync -n <namespace> <name>

# List
f5xcctl configuration list sync -n <namespace>

# Delete
f5xcctl configuration delete sync -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_sync" "example" {
  name      = "example-sync"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
