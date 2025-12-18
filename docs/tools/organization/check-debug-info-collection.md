---
page_title: f5xc_check_debug_info_collection - f5xc-api-mcp
subcategory: Organization
description: Check Debug Info Collection
---

# Check Debug Info Collection

Check if the zip file of debug info from node is available

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-check-debug-info-collection-list` | Check Debug Info Collection |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Check Debug Info Collection resources:

### List Check Debug Info Collections

> "List all check-debug-info-collections in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f check_debug_info_collection.yaml

# Get
f5xcctl get check_debug_info_collection {name} -n {namespace}

# List
f5xcctl get check_debug_info_collections -n {namespace}

# Delete
f5xcctl delete check_debug_info_collection {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_check_debug_info_collection" "example" {
  name      = "example-check-debug-info-collection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
