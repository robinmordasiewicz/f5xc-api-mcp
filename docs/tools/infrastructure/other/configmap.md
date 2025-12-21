---
page_title: f5xc_configmap - f5xc-api-mcp
subcategory: Infrastructure
description: ConfigMap List.
---

# Configmap

API to GET list of configmaps for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-configmap-list` | ConfigMap List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace to scope the listing of configmaps in a site. |

## Example Usage

Ask Claude to help you work with Configmap resources:

### List Configmaps

> "List all configmaps in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create configmap -n <namespace> -i configmap.yaml

# Get
f5xcctl infrastructure get configmap <name> -n <namespace>

# List
f5xcctl infrastructure list configmap -n <namespace>

# Delete
f5xcctl infrastructure delete configmap <name> -n <namespace>
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
