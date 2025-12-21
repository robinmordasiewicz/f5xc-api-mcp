---
page_title: f5xc_image - f5xc-api-mcp
subcategory: Identity
description: DeleteUserImage.
---

# Image

GetUserProfileImage returns user profile picture.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-image-list` | GetUserProfileImage. |
| `f5xc-api-identity-image-update` | UpdateUserImage. |
| `f5xc-api-identity-image-delete` | DeleteUserImage. |

## Example Usage

Ask Claude to help you work with Image resources:

### List Images

> "List all images in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create image -n <namespace> -i image.yaml

# Get
f5xcctl identity get image <name> -n <namespace>

# List
f5xcctl identity list image -n <namespace>

# Delete
f5xcctl identity delete image <name> -n <namespace>
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
