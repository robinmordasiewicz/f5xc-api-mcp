---
page_title: f5xc_software_os_version - f5xc-api-mcp
subcategory: Organization
description: Get OS based on SW_VERSION
---

# Software Os Version

API to get os IMAGE based on the software version

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-software-os-version-create` | Get OS based on SW_VERSION |

## Example Usage

Ask Claude to help you work with Software Os Version resources:

### Create Software Os Version

> "Create a software-os-version named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create software_os_version -n <namespace> -i software_os_version.yaml

# Get
f5xcctl configuration get software_os_version -n <namespace> <name>

# List
f5xcctl configuration list software_os_version -n <namespace>

# Delete
f5xcctl configuration delete software_os_version -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_software_os_version" "example" {
  name      = "example-software-os-version"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
