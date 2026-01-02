---
page_title: f5xc_sync - f5xc-api-mcp
subcategory: Tenant And Identity
description: Sync user
---

# Sync

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

In case when user created initially from identity provider we need to sync the user data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-sync-create` | Sync user |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- sync

## Example Usage

Ask Claude to help you work with Sync resources:

### Create Sync

> "Create a sync named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create sync -n <namespace> -i sync.yaml

# Get
xcsh tenant_and_identity get sync <name> -n <namespace>

# List
xcsh tenant_and_identity list sync -n <namespace>

# Delete
xcsh tenant_and_identity delete sync <name> -n <namespace>
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
