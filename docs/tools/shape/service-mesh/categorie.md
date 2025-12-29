---
page_title: f5xc_categorie - f5xc-api-mcp
subcategory: Shape
description: Endpoint Categories.
---

# Categorie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Endpoint Category Breakdown.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-categorie-create` | Endpoint Categories. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- categorie

## Example Usage

Ask Claude to help you work with Categorie resources:

### Create Categorie

> "Create a categorie named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape categorie create {name} --namespace {namespace}
```

Create categorie

### file_based

```bash
f5xcctl shape categorie create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create categorie -n <namespace> -i categorie.yaml

# Get
f5xcctl shape get categorie <name> -n <namespace>

# List
f5xcctl shape list categorie -n <namespace>

# Delete
f5xcctl shape delete categorie <name> -n <namespace>
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
