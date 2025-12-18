---
page_title: f5xc_categorie - f5xc-api-mcp
subcategory: Organization
description: Endpoint Categories
---

# Categorie

Get Endpoint Category Breakdown

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-categorie-create` | Endpoint Categories |

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
f5xcctl apply -f categorie.yaml

# Get
f5xcctl get categorie {name} -n {namespace}

# List
f5xcctl get categories -n {namespace}

# Delete
f5xcctl delete categorie {name} -n {namespace}
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
