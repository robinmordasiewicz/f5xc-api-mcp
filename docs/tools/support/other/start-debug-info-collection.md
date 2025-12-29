---
page_title: f5xc_start_debug_info_collection - f5xc-api-mcp
subcategory: Support
description: Start Debug Info Collection.
---

# Start Debug Info Collection

!!! info "Low Risk"
    Operations on this resource are generally safe.

Start collecting a zip file of debug info from node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-start-debug-info-collection-list` | Start Debug Info Collection. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Start Debug Info Collection resources:

### List Start Debug Info Collections

> "List all start-debug-info-collections in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate start-debug-info-collection list --namespace {namespace}
```

List all start-debug-info-collections

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create start_debug_info_collection -n <namespace> -i start_debug_info_collection.yaml

# Get
f5xcctl support get start_debug_info_collection <name> -n <namespace>

# List
f5xcctl support list start_debug_info_collection -n <namespace>

# Delete
f5xcctl support delete start_debug_info_collection <name> -n <namespace>
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
