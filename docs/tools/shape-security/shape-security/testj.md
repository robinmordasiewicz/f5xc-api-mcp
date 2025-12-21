---
page_title: f5xc_testj - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Test JS
---

# Testj

Validate JS script tag injection in the target URL.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-testj-create` | Test JS |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Testj resources:

### Create Testj

> "Create a testj named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create testj -n <namespace> -i testj.yaml

# Get
f5xcctl configuration get testj -n <namespace> <name>

# List
f5xcctl configuration list testj -n <namespace>

# Delete
f5xcctl configuration delete testj -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_testj" "example" {
  name      = "example-testj"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
