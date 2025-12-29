---
page_title: f5xc_mobile_base_config_file - f5xc-api-mcp
subcategory: Shape
description: GET Mobile Base Configuration File.
---

# Mobile Base Config File

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Mobile Base Configuration File.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-mobile-base-config-file-get` | GET Mobile Base Configuration File. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Mobile SDK Base Configuration name | `App 8000` |
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Mobile Base Config File resources:

### Get Mobile Base Config File Details

> "Get details of the mobile-base-config-file named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl mobile mobile-base-config-file get {name} --namespace {namespace}
```

Get specific mobile-base-config-file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create mobile_base_config_file -n <namespace> -i mobile_base_config_file.yaml

# Get
f5xcctl shape get mobile_base_config_file <name> -n <namespace>

# List
f5xcctl shape list mobile_base_config_file -n <namespace>

# Delete
f5xcctl shape delete mobile_base_config_file <name> -n <namespace>
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
