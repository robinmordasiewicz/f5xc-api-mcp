---
page_title: f5xc_sync - f5xc-api-mcp
subcategory: Organization
description: Sync user
---

# Sync

In case when user created initially from identity provider we need to sync the user data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-sync-create` | Sync user |

## Example Usage

Ask Claude to help you work with Sync resources:

### Create Sync

> "Create a sync named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f sync.yaml

# Get
f5xcctl get sync {name} -n {namespace}

# List
f5xcctl get syncs -n {namespace}

# Delete
f5xcctl delete sync {name} -n {namespace}
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
