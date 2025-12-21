---
page_title: f5xc_cache_purge - f5xc-api-mcp
subcategory: CDN
description: Purge CDN Cache.
---

# Cache Purge

Initiate Purge for Edge CDN Cache.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-cache-purge-create` | Purge CDN Cache. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | CDN Distribution Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Cache Purge resources:

### Create Cache Purge

> "Create a cache-purge named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create cache_purge -n <namespace> -i cache_purge.yaml

# Get
f5xcctl configuration get cache_purge -n <namespace> <name>

# List
f5xcctl configuration list cache_purge -n <namespace>

# Delete
f5xcctl configuration delete cache_purge -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_cache_purge" "example" {
  name      = "example-cache-purge"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
