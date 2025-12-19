---
page_title: f5xc_upgradable_sw_version - f5xc-api-mcp
subcategory: Organization
description: Get Upgradable SW Versions
---

# Upgradable Sw Version

API to get list of sw versions that can be upgraded to

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-upgradable-sw-version-list` | Get Upgradable SW Versions |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `current_os_version` | The current_os_version parameter |
| `current_sw_version` | The current_sw_version parameter |

## Example Usage

Ask Claude to help you work with Upgradable Sw Version resources:

### List Upgradable Sw Versions

> "List all upgradable-sw-versions in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create upgradable_sw_version -n <namespace> -i upgradable_sw_version.yaml

# Get
f5xcctl configuration get upgradable_sw_version -n <namespace> <name>

# List
f5xcctl configuration list upgradable_sw_version -n <namespace>

# Delete
f5xcctl configuration delete upgradable_sw_version -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_upgradable_sw_version" "example" {
  name      = "example-upgradable-sw-version"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
