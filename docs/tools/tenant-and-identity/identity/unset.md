---
page_title: f5xc_unset - f5xc-api-mcp
subcategory: Tenant And Identity
description: Unset admin ntfn preference.
---

# Unset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Unset admin ntfn preference unsets specific admin notification preference for the user and store it
in user settings object.
It can be used in email newsletters to allow easy unsubscribing for users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-unset-update` | Unset admin ntfn preference. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- unset

## Example Usage

Ask Claude to help you work with Unset resources:

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create unset -n <namespace> -i unset.yaml

# Get
xcsh tenant_and_identity get unset <name> -n <namespace>

# List
xcsh tenant_and_identity list unset -n <namespace>

# Delete
xcsh tenant_and_identity delete unset <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unset" "example" {
  name      = "example-unset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
