---
page_title: f5xc_persistentvolume - f5xc-api-mcp
subcategory: Kubernetes
description: PersistentVolume List
---

# Persistentvolume

API to get list of Persistent Volumes in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-persistentvolume-list` | PersistentVolume List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | site |

## Example Usage

Ask Claude to help you work with Persistentvolume resources:

### List Persistentvolumes

> "List all persistentvolumes in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create persistentvolume -n <namespace> -i persistentvolume.yaml

# Get
f5xcctl configuration get persistentvolume -n <namespace> <name>

# List
f5xcctl configuration list persistentvolume -n <namespace>

# Delete
f5xcctl configuration delete persistentvolume -n <namespace> <name>
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
