---
page_title: f5xc_get_image_download_url - f5xc-api-mcp
subcategory: Sites
description: Get Image Download URL
---

# Get Image Download Url

Returns image download url for each provider

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-get-image-download-url-create` | Get Image Download URL |

## Example Usage

Ask Claude to help you work with Get Image Download Url resources:

### Create Get Image Download Url

> "Create a get-image-download-url named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create get_image_download_url -n <namespace> -i get_image_download_url.yaml

# Get
f5xcctl configuration get get_image_download_url -n <namespace> <name>

# List
f5xcctl configuration list get_image_download_url -n <namespace>

# Delete
f5xcctl configuration delete get_image_download_url -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_get_image_download_url" "example" {
  name      = "example-get-image-download-url"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
