---
page_title: f5xc_cache_purge - f5xc-api-mcp
subcategory: Organization
description: Purge CDN Cache
---

# Cache Purge

Initiate Purge for Edge CDN Cache

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cache-purge-create` | Purge CDN Cache |

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
f5xcctl apply -f cache_purge.yaml

# Get
f5xcctl get cache_purge {name} -n {namespace}

# List
f5xcctl get cache_purges -n {namespace}

# Delete
f5xcctl delete cache_purge {name} -n {namespace}
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
