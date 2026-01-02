---
page_title: f5xc_view_preference - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET view preference.
---

# View Preference

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET view preference gets view preference for specific user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-view-preference-list` | GET view preference. |
| `f5xc-api-tenantandidentity-view-preference-update` | Set view preference. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- view-preference

## Example Usage

Ask Claude to help you work with View Preference resources:

### List View Preferences

> "List all view-preferences in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create view_preference -n <namespace> -i view_preference.yaml

# Get
xcsh tenant_and_identity get view_preference <name> -n <namespace>

# List
xcsh tenant_and_identity list view_preference -n <namespace>

# Delete
xcsh tenant_and_identity delete view_preference <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_view_preference" "example" {
  name      = "example-view-preference"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
