---
page_title: f5xc_cache_purge - f5xc-api-mcp
subcategory: CDN
description: Purge CDN Cache.
---

# Cache Purge

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Initiate Purge for Edge CDN Cache.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-cache-purge-create` | Purge CDN Cache. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | CDN Distribution Name | `CDN-1` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- cache-purge

## Example Usage

Ask Claude to help you work with Cache Purge resources:

### Create Cache Purge

> "Create a cache-purge named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl cdn cache-purge create {name} --namespace {namespace}
```

Create cache-purge

### file_based

```bash
f5xcctl cdn cache-purge create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create cache_purge -n <namespace> -i cache_purge.yaml

# Get
f5xcctl cdn get cache_purge <name> -n <namespace>

# List
f5xcctl cdn list cache_purge -n <namespace>

# Delete
f5xcctl cdn delete cache_purge <name> -n <namespace>
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
