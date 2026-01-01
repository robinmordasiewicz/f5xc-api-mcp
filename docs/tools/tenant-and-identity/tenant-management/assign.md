---
page_title: f5xc_assign - f5xc-api-mcp
subcategory: Tenant And Identity
description: Assign domain owner.
---

# Assign

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Assign domain owner tries to assign domain owner to user in the request. It checks that requester is
domain owner as well.
It implies such steps:

- mark user as domain owner

- if user is SSO

- mark
user as F5 Distributed Cloud managed

- send update password email

- set admin roles in system,
shared, * namespaces
NOTE: previous roles (which was explicitly assigned to this user) will be
deleted.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-assign-create` | Assign domain owner. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- assign

## Example Usage

Ask Claude to help you work with Assign resources:

### Create Assign

> "Create a assign named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create assign -n <namespace> -i assign.yaml

# Get
xcsh tenant_and_identity get assign <name> -n <namespace>

# List
xcsh tenant_and_identity list assign -n <namespace>

# Delete
xcsh tenant_and_identity delete assign <name> -n <namespace>
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
