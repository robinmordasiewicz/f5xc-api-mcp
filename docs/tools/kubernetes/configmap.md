---
page_title: f5xc_configmap - f5xc-api-mcp
subcategory: Kubernetes
description: ConfigMap List
---

# Configmap

API to get list of configmaps for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-configmap-list` | ConfigMap List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | site |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | The namespace parameter |

## Example Usage

Ask Claude to help you work with Configmap resources:

### List Configmaps

> "List all configmaps in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create configmap -n <namespace> -i configmap.yaml

# Get
f5xcctl configuration get configmap -n <namespace> <name>

# List
f5xcctl configuration list configmap -n <namespace>

# Delete
f5xcctl configuration delete configmap -n <namespace> <name>
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
