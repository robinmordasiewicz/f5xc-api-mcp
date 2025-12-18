---
page_title: f5xc_create - f5xc-api-mcp
subcategory: Organization
description: Create
---

# Create

Create creates a new label in shared namespace. Any other namespace requested will return error

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-create-create` | Create |

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
f5xcctl apply -f create.yaml

# Get
f5xcctl get create {name} -n {namespace}

# List
f5xcctl get creates -n {namespace}

# Delete
f5xcctl delete create {name} -n {namespace}
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
