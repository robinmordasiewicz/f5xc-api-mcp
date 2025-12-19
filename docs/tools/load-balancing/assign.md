---
page_title: f5xc_assign - f5xc-api-mcp
subcategory: Load Balancing
description: Assign API Definition
---

# Assign

Set a reference to the API Definition, with an option to create an empty one if not
exists.
DEPRECATED. instead use virtual host public custom api - AssignAPIDefinition

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-assign-create` | Assign API Definition |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Assign resources:

### Create Assign

> "Create a assign named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create assign -n <namespace> -i assign.yaml

# Get
f5xcctl configuration get assign -n <namespace> <name>

# List
f5xcctl configuration list assign -n <namespace>

# Delete
f5xcctl configuration delete assign -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_assign" "example" {
  name      = "example-assign"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
