---
page_title: f5xc_delete - f5xc-api-mcp
subcategory: Users
description: DELETE
---

# Delete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DELETE will DELETE a given label label key = label value from current tenants shared namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-delete-create` | DELETE |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- delete

## Example Usage

Ask Claude to help you work with Delete resources:

### Create Delete

> "Create a delete named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh users create delete -n <namespace> -i delete.yaml

# Get
xcsh users get delete <name> -n <namespace>

# List
xcsh users list delete -n <namespace>

# Delete
xcsh users delete delete <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_delete" "example" {
  name      = "example-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
