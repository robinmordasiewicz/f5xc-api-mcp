---
page_title: f5xc_create - f5xc-api-mcp
subcategory: Users
description: Create
---

# Create

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create creates a new label in shared namespace. Any other namespace requested will return error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-create-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create

## Example Usage

Ask Claude to help you work with Create resources:

### Create Create

> "Create a create named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh users create create -n <namespace> -i create.yaml

# Get
xcsh users get create <name> -n <namespace>

# List
xcsh users list create -n <namespace>

# Delete
xcsh users delete create <name> -n <namespace>
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
