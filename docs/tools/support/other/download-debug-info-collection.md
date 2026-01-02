---
page_title: f5xc_download_debug_info_collection - f5xc-api-mcp
subcategory: Support
description: Download Debug Info Collection.
---

# Download Debug Info Collection

!!! info "Low Risk"
    Operations on this resource are generally safe.

Download the zip file of debug info from node if available.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-download-debug-info-collection-list` | Download Debug Info Collection. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Download Debug Info Collection resources:

### List Download Debug Info Collections

> "List all download-debug-info-collections in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create download_debug_info_collection -n <namespace> -i download_debug_info_collection.yaml

# Get
xcsh support get download_debug_info_collection <name> -n <namespace>

# List
xcsh support list download_debug_info_collection -n <namespace>

# Delete
xcsh support delete download_debug_info_collection <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_download_debug_info_collection" "example" {
  name      = "example-download-debug-info-collection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
