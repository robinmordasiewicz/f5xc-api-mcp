---
page_title: f5xc_upgradable_sw_version - f5xc-api-mcp
subcategory: Ce Management
description: GET Upgradable SW Versions.
---

# Upgradable Sw Version

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of sw versions that can be upgraded to.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-upgradable-sw-version-list` | GET Upgradable SW Versions. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `current_os_version` | Fetch upgradable sw versions for site. | `9.2023.23` |
| `current_sw_version` | Fetch upgradable sw versions for site. | `Crt-20241107-1123.` |

## Example Usage

Ask Claude to help you work with Upgradable Sw Version resources:

### List Upgradable Sw Versions

> "List all upgradable-sw-versions in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create upgradable_sw_version -n <namespace> -i upgradable_sw_version.yaml

# Get
xcsh ce_management get upgradable_sw_version <name> -n <namespace>

# List
xcsh ce_management list upgradable_sw_version -n <namespace>

# Delete
xcsh ce_management delete upgradable_sw_version <name> -n <namespace>
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
