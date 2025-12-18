---
page_title: f5xc_download_debug_info_collection - f5xc-api-mcp
subcategory: Organization
description: Download Debug Info Collection
---

# Download Debug Info Collection

Download the zip file of debug info from node if available

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-download-debug-info-collection-list` | Download Debug Info Collection |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Download Debug Info Collection resources:

### List Download Debug Info Collections

> "List all download-debug-info-collections in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f download_debug_info_collection.yaml

# Get
f5xcctl get download_debug_info_collection {name} -n {namespace}

# List
f5xcctl get download_debug_info_collections -n {namespace}

# Delete
f5xcctl delete download_debug_info_collection {name} -n {namespace}
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
