---
page_title: f5xc_get_image_download_url - f5xc-api-mcp
subcategory: Ce Management
description: GET Image Download URL.
---

# Get Image Download Url

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns image download URL for each provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-get-image-download-url-create` | GET Image Download URL. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-image-download-url

## Example Usage

Ask Claude to help you work with Get Image Download Url resources:

### Create Get Image Download Url

> "Create a get-image-download-url named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl register get-image-download-url create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl register get-image-download-url create {name} --namespace {namespace}
```

Create get-image-download-url

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create get_image_download_url -n <namespace> -i get_image_download_url.yaml

# Get
f5xcctl ce_management get get_image_download_url <name> -n <namespace>

# List
f5xcctl ce_management list get_image_download_url -n <namespace>

# Delete
f5xcctl ce_management delete get_image_download_url <name> -n <namespace>
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
