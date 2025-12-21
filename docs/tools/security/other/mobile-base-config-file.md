---
page_title: f5xc_mobile_base_config_file - f5xc-api-mcp
subcategory: Security
description: GET Mobile Base Configuration File.
---

# Mobile Base Config File

GET Mobile Base Configuration File.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-mobile-base-config-file-get` | GET Mobile Base Configuration File. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Mobile SDK Base Configuration name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Mobile Base Config File resources:

### Get Mobile Base Config File Details

> "Get details of the mobile-base-config-file named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create mobile_base_config_file -n <namespace> -i mobile_base_config_file.yaml

# Get
f5xcctl security get mobile_base_config_file <name> -n <namespace>

# List
f5xcctl security list mobile_base_config_file -n <namespace>

# Delete
f5xcctl security delete mobile_base_config_file <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_mobile_base_config_file" "example" {
  name      = "example-mobile-base-config-file"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
