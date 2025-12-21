---
page_title: f5xc_assign - f5xc-api-mcp
subcategory: Load Balancing
description: Assign API Definition.
---

# Assign

Set a reference to the API Definition, with an option to create an empty one if not
exists.
DEPRECATED. Instead use virtual host public custom API - AssignAPIDefinition.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-assign-create` | Assign API Definition. |

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
f5xcctl load_balancer create assign -n <namespace> -i assign.yaml

# Get
f5xcctl load_balancer get assign <name> -n <namespace>

# List
f5xcctl load_balancer list assign -n <namespace>

# Delete
f5xcctl load_balancer delete assign <name> -n <namespace>
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
