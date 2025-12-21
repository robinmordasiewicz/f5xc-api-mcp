---
page_title: f5xc_cascade_delete - f5xc-api-mcp
subcategory: Identity
description: DELETE User and Related Objects.
---

# Cascade Delete

CascadeDelete deletes the user and associated namespace roles for this user.
Use this only if the
user and its referenced objects need to be wiped out altogether.
Note: users will always be in the
system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-cascade-delete-create` | DELETE User and Related Objects. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Cascade Delete resources:

### Create Cascade Delete

> "Create a cascade-delete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create cascade_delete -n <namespace> -i cascade_delete.yaml

# Get
f5xcctl identity get cascade_delete <name> -n <namespace>

# List
f5xcctl identity list cascade_delete -n <namespace>

# Delete
f5xcctl identity delete cascade_delete <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cascade_delete" "example" {
  name      = "example-cascade-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
