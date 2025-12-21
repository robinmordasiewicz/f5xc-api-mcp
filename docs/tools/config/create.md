---
page_title: f5xc_create - f5xc-api-mcp
subcategory: Config
description: Create
---

# Create

Create creates a new label in shared namespace. Any other namespace requested will return error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-config-create-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Create resources:

### Create Create

> "Create a create named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create create -n <namespace> -i create.yaml

# Get
f5xcctl configuration get create -n <namespace> <name>

# List
f5xcctl configuration list create -n <namespace>

# Delete
f5xcctl configuration delete create -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_create" "example" {
  name      = "example-create"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
