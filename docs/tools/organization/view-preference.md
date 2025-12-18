---
page_title: f5xc_view_preference - f5xc-api-mcp
subcategory: Organization
description: Get view preference
---

# View Preference

Get view preference gets view preference for specific user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-view-preference-list` | Get view preference |
| `f5xc-api-core-view-preference-update` | Set view preference |

## Example Usage

Ask Claude to help you work with View Preference resources:

### List View Preferences

> "List all view-preferences in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f view_preference.yaml

# Get
f5xcctl get view_preference {name} -n {namespace}

# List
f5xcctl get view_preferences -n {namespace}

# Delete
f5xcctl delete view_preference {name} -n {namespace}
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
