---
page_title: f5xc_change_password - f5xc-api-mcp
subcategory: Organization
description: ChangePassword
---

# Change Password

Change host user password

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-change-password-create` | ChangePassword |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Change Password resources:

### Create Change Password

> "Create a change-password named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f change_password.yaml

# Get
f5xcctl get change_password {name} -n {namespace}

# List
f5xcctl get change_passwords -n {namespace}

# Delete
f5xcctl delete change_password {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_change_password" "example" {
  name      = "example-change-password"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
