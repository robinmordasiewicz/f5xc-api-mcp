---
page_title: f5xc_bfp - f5xc-api-mcp
subcategory: Observability
description: Top Attacked BFP.
---

# Bfp

Top Attacked BFP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-bfp-create` | Top Attacked BFP. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Bfp resources:

### Create Bfp

> "Create a bfp named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create bfp -n <namespace> -i bfp.yaml

# Get
f5xcctl configuration get bfp -n <namespace> <name>

# List
f5xcctl configuration list bfp -n <namespace>

# Delete
f5xcctl configuration delete bfp -n <namespace> <name>
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
