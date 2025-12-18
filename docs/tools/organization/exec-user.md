---
page_title: f5xc_exec_user - f5xc-api-mcp
subcategory: Organization
description: ExecUser
---

# Exec User

Run supported exec command on node with lower privilege

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-exec-user-create` | ExecUser |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Exec User resources:

### Create Exec User

> "Create a exec-user named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f exec_user.yaml

# Get
f5xcctl get exec_user {name} -n {namespace}

# List
f5xcctl get exec_users -n {namespace}

# Delete
f5xcctl delete exec_user {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_exec_user" "example" {
  name      = "example-exec-user"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
