---
page_title: f5xc_persistentvolume - f5xc-api-mcp
subcategory: Infrastructure
description: PersistentVolume List.
---

# Persistentvolume

API to GET list of Persistent Volumes in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-persistentvolume-list` | PersistentVolume List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

## Example Usage

Ask Claude to help you work with Persistentvolume resources:

### List Persistentvolumes

> "List all persistentvolumes in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create persistentvolume -n <namespace> -i persistentvolume.yaml

# Get
f5xcctl infrastructure get persistentvolume <name> -n <namespace>

# List
f5xcctl infrastructure list persistentvolume -n <namespace>

# Delete
f5xcctl infrastructure delete persistentvolume <name> -n <namespace>
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
