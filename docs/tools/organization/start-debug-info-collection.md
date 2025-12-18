---
page_title: f5xc_start_debug_info_collection - f5xc-api-mcp
subcategory: Organization
description: Start Debug Info Collection
---

# Start Debug Info Collection

Start collecting a zip file of debug info from node

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-start-debug-info-collection-list` | Start Debug Info Collection |

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
f5xcctl apply -f start_debug_info_collection.yaml

# Get
f5xcctl get start_debug_info_collection {name} -n {namespace}

# List
f5xcctl get start_debug_info_collections -n {namespace}

# Delete
f5xcctl delete start_debug_info_collection {name} -n {namespace}
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
