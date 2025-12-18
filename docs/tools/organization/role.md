---
page_title: f5xc_role - f5xc-api-mcp
subcategory: Organization
description: Custom Create Role
---

# Role

Create a role object and the rbac_policy object which the role associated with.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-role-create` | Custom Create Role |
| `f5xc-api-core-role-get` | Custom Get Role |
| `f5xc-api-core-role-list` | Custom List Roles |
| `f5xc-api-core-role-update` | Custom Replace Role |
| `f5xc-api-core-role-delete` | Delete Role |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `name` | Name |

## Example Usage

Ask Claude to help you work with Role resources:

### Create Role

> "Create a role named 'example' in the 'production' namespace"

### List Roles

> "List all roles in the 'production' namespace"

### Get Role Details

> "Get details of the role named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f role.yaml

# Get
f5xcctl get role {name} -n {namespace}

# List
f5xcctl get roles -n {namespace}

# Delete
f5xcctl delete role {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_role" "example" {
  name      = "example-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
