---
page_title: f5xc_setting - f5xc-api-mcp
subcategory: Infrastructure
description: Module Management Settings.
---

# Setting

Receive the module settings.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-setting-list` | Module Management Settings. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Setting resources:

### List Settings

> "List all settings in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create setting -n <namespace> -i setting.yaml

# Get
f5xcctl infrastructure get setting <name> -n <namespace>

# List
f5xcctl infrastructure list setting -n <namespace>

# Delete
f5xcctl infrastructure delete setting <name> -n <namespace>
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
