---
page_title: f5xc_persistentvolumeclaim - f5xc-api-mcp
subcategory: Organization
description: PersistentVolumeClaim List
---

# Persistentvolumeclaim

API to get list of PVCs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-persistentvolumeclaim-list` | PersistentVolumeClaim List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `site` | site |

## Example Usage

Ask Claude to help you work with Persistentvolumeclaim resources:

### List Persistentvolumeclaims

> "List all persistentvolumeclaims in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f persistentvolumeclaim.yaml

# Get
f5xcctl get persistentvolumeclaim {name} -n {namespace}

# List
f5xcctl get persistentvolumeclaims -n {namespace}

# Delete
f5xcctl delete persistentvolumeclaim {name} -n {namespace}
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
