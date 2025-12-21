---
page_title: f5xc_namespace - f5xc-api-mcp
subcategory: Infrastructure
description: Namespace List.
---

# Namespace

API to GET list of namespaces in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-namespace-list` | Namespace List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

## Example Usage

Ask Claude to help you work with Namespace resources:

### List Namespaces

> "List all namespaces in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create namespace -n <namespace> -i namespace.yaml

# Get
f5xcctl configuration get namespace -n <namespace> <name>

# List
f5xcctl configuration list namespace -n <namespace>

# Delete
f5xcctl configuration delete namespace -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_namespace" "example" {
  name      = "example-namespace"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
