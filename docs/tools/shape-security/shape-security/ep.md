---
page_title: f5xc_ep - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: PostSafeEp.
---

# Ep

POST Safe Analyst Station ep request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-ep-create` | PostSafeEp. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Ep resources:

### Create Ep

> "Create a ep named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ep -n <namespace> -i ep.yaml

# Get
f5xcctl configuration get ep -n <namespace> <name>

# List
f5xcctl configuration list ep -n <namespace>

# Delete
f5xcctl configuration delete ep -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ep" "example" {
  name      = "example-ep"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
