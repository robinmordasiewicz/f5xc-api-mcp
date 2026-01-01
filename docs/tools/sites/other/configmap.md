---
page_title: f5xc_configmap - f5xc-api-mcp
subcategory: Sites
description: ConfigMap List.
---

# Configmap

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of configmaps for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-configmap-list` | ConfigMap List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace to scope the listing of configmaps in a site. | `Ns1` |

## Example Usage

Ask Claude to help you work with Configmap resources:

### List Configmaps

> "List all configmaps in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create configmap -n <namespace> -i configmap.yaml

# Get
xcsh sites get configmap <name> -n <namespace>

# List
xcsh sites list configmap -n <namespace>

# Delete
xcsh sites delete configmap <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_configmap" "example" {
  name      = "example-configmap"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
