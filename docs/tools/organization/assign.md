---
page_title: f5xc_assign - f5xc-api-mcp
subcategory: Organization
description: Assign domain owner
---

# Assign

Assign domain owner tries to assign domain owner to user in the request. It checks that requester is
domain owner as well.
It implies such steps:

1) mark user as domain owner
2) if user is SSO - mark
user as volterra managed - send update password email
3) set admin roles in system, shared, *
namespaces
NOTE: previous roles (which was explicitly assigned to this user) will be deleted

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-assign-create` | Assign domain owner |

## Example Usage

Ask Claude to help you work with Assign resources:

### Create Assign

> "Create a assign named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f assign.yaml

# Get
f5xcctl get assign {name} -n {namespace}

# List
f5xcctl get assigns -n {namespace}

# Delete
f5xcctl delete assign {name} -n {namespace}
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
