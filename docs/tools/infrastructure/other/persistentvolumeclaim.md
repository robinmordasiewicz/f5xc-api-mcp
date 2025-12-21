---
page_title: f5xc_persistentvolumeclaim - f5xc-api-mcp
subcategory: Infrastructure
description: PersistentVolumeClaim List.
---

# Persistentvolumeclaim

API to GET list of PVCs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-persistentvolumeclaim-list` | PersistentVolumeClaim List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Persistentvolumeclaim resources:

### List Persistentvolumeclaims

> "List all persistentvolumeclaims in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create persistentvolumeclaim -n <namespace> -i persistentvolumeclaim.yaml

# Get
f5xcctl configuration get persistentvolumeclaim -n <namespace> <name>

# List
f5xcctl configuration list persistentvolumeclaim -n <namespace>

# Delete
f5xcctl configuration delete persistentvolumeclaim -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_persistentvolumeclaim" "example" {
  name      = "example-persistentvolumeclaim"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
