---
page_title: f5xc_persistentvolume - f5xc-api-mcp
subcategory: Sites
description: PersistentVolume List.
---

# Persistentvolume

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of Persistent Volumes in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-persistentvolume-list` | PersistentVolume List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Persistentvolume resources:

### List Persistentvolumes

> "List all persistentvolumes in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data persistentvolume list --namespace {namespace}
```

List all persistentvolumes

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create persistentvolume -n <namespace> -i persistentvolume.yaml

# Get
f5xcctl sites get persistentvolume <name> -n <namespace>

# List
f5xcctl sites list persistentvolume -n <namespace>

# Delete
f5xcctl sites delete persistentvolume <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_persistentvolume" "example" {
  name      = "example-persistentvolume"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
