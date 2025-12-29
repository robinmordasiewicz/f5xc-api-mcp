---
page_title: f5xc_bfp - f5xc-api-mcp
subcategory: Shape
description: Top Attacked BFP.
---

# Bfp

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Top Attacked BFP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bfp-create` | Top Attacked BFP. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- bfp

## Example Usage

Ask Claude to help you work with Bfp resources:

### Create Bfp

> "Create a bfp named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape bfp create {name} --namespace {namespace}
```

Create bfp

### file_based

```bash
f5xcctl shape bfp create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create bfp -n <namespace> -i bfp.yaml

# Get
f5xcctl shape get bfp <name> -n <namespace>

# List
f5xcctl shape list bfp -n <namespace>

# Delete
f5xcctl shape delete bfp <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bfp" "example" {
  name      = "example-bfp"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
