---
page_title: f5xc_persistentvolumeclaim - f5xc-api-mcp
subcategory: Sites
description: PersistentVolumeClaim List.
---

# Persistentvolumeclaim

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of PVCs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-persistentvolumeclaim-list` | PersistentVolumeClaim List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Persistentvolumeclaim resources:

### List Persistentvolumeclaims

> "List all persistentvolumeclaims in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data persistentvolumeclaim list --namespace {namespace}
```

List all persistentvolumeclaims

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create persistentvolumeclaim -n <namespace> -i persistentvolumeclaim.yaml

# Get
f5xcctl sites get persistentvolumeclaim <name> -n <namespace>

# List
f5xcctl sites list persistentvolumeclaim -n <namespace>

# Delete
f5xcctl sites delete persistentvolumeclaim <name> -n <namespace>
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
