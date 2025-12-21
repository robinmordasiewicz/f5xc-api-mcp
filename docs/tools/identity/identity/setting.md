---
page_title: f5xc_setting - f5xc-api-mcp
subcategory: Identity
description: GET
---

# Setting

Retrieves current user settings object defined to the user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-setting-list` | GET |
| `f5xc-api-identity-setting-update` | Update |

## Example Usage

Ask Claude to help you work with Setting resources:

### List Settings

> "List all settings in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create setting -n <namespace> -i setting.yaml

# Get
f5xcctl identity get setting <name> -n <namespace>

# List
f5xcctl identity list setting -n <namespace>

# Delete
f5xcctl identity delete setting <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_setting" "example" {
  name      = "example-setting"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
