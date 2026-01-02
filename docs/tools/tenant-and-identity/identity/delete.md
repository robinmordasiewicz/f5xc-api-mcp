---
page_title: f5xc_delete - f5xc-api-mcp
subcategory: Tenant And Identity
description: DELETE
---

# Delete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DELETE deletes OIDC provider by name. This would also disable SCIM integration for the tenant, if at
all, it was enabled.
Returns OIDC provider object that gets deleted. Query will look into current
tenants `system` namespace for OIDC provider by name.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-delete-create` | DELETE |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `System` |

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
xcsh tenant_and_identity create delete -n <namespace> -i delete.yaml

# Get
xcsh tenant_and_identity get delete <name> -n <namespace>

# List
xcsh tenant_and_identity list delete -n <namespace>

# Delete
xcsh tenant_and_identity delete delete <name> -n <namespace>
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
