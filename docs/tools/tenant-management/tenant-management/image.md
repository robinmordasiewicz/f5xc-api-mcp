---
page_title: f5xc_image - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: DELETE tenant profile image.
---

# Image

Uploads new profile image for the tenant entity.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-image-list` | Tenant profile image. |
| `f5xc-api-tenantmanagement-image-update` | Update tenant profile image. |
| `f5xc-api-tenantmanagement-image-delete` | DELETE tenant profile image. |

## Example Usage

Ask Claude to help you work with Image resources:

### List Images

> "List all images in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create image -n <namespace> -i image.yaml

# Get
f5xcctl configuration get image -n <namespace> <name>

# List
f5xcctl configuration list image -n <namespace>

# Delete
f5xcctl configuration delete image -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_image" "example" {
  name      = "example-image"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
