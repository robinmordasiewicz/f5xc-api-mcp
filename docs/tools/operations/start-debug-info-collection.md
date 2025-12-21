---
page_title: f5xc_start_debug_info_collection - f5xc-api-mcp
subcategory: Operations
description: Start Debug Info Collection.
---

# Start Debug Info Collection

Start collecting a zip file of debug info from node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-start-debug-info-collection-list` | Start Debug Info Collection. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Start Debug Info Collection resources:

### List Start Debug Info Collections

> "List all start-debug-info-collections in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create start_debug_info_collection -n <namespace> -i start_debug_info_collection.yaml

# Get
f5xcctl configuration get start_debug_info_collection -n <namespace> <name>

# List
f5xcctl configuration list start_debug_info_collection -n <namespace>

# Delete
f5xcctl configuration delete start_debug_info_collection -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_start_debug_info_collection" "example" {
  name      = "example-start-debug-info-collection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
