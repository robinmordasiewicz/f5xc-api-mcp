---
page_title: f5xc_categorie - f5xc-api-mcp
subcategory: Observability
description: Endpoint Categories.
---

# Categorie

GET Endpoint Category Breakdown.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-categorie-create` | Endpoint Categories. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Categorie resources:

### Create Categorie

> "Create a categorie named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create categorie -n <namespace> -i categorie.yaml

# Get
f5xcctl configuration get categorie -n <namespace> <name>

# List
f5xcctl configuration list categorie -n <namespace>

# Delete
f5xcctl configuration delete categorie -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_categorie" "example" {
  name      = "example-categorie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
