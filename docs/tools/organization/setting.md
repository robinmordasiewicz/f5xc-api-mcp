---
page_title: f5xc_setting - f5xc-api-mcp
subcategory: Organization
description: Module Management Settings
---

# Setting

UpdateIDMSettings allows to adjust IDM settings for tenant, like password policy, brute-force
detection policy, etc...

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-setting-list` | Module Management Settings |
| `f5xc-api-core-setting-update` | UpdateIDMSettings |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Setting resources:

### List Settings

> "List all settings in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f setting.yaml

# Get
f5xcctl get setting {name} -n {namespace}

# List
f5xcctl get settings -n {namespace}

# Delete
f5xcctl delete setting {name} -n {namespace}
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
