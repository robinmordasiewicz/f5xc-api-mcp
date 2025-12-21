---
page_title: f5xc_delete - f5xc-api-mcp
subcategory: Identity
description: DELETE
---

# Delete

DELETE deletes OIDC provider by name. This would also disable SCIM integration for the tenant, if at
all, it was enabled.
Returns OIDC provider object that gets deleted. Query will look into current
tenants `system` namespace for OIDC provider by name.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-delete-create` | DELETE |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Delete resources:

### Create Delete

> "Create a delete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create delete -n <namespace> -i delete.yaml

# Get
f5xcctl configuration get delete -n <namespace> <name>

# List
f5xcctl configuration list delete -n <namespace>

# Delete
f5xcctl configuration delete delete -n <namespace> <name>
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
