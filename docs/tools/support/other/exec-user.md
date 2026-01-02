---
page_title: f5xc_exec_user - f5xc-api-mcp
subcategory: Support
description: ExecUser
---

# Exec User

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run supported exec command on node with lower privilege.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-exec-user-create` | ExecUser |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- exec-user

## Example Usage

Ask Claude to help you work with Exec User resources:

### Create Exec User

> "Create a exec-user named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create exec_user -n <namespace> -i exec_user.yaml

# Get
xcsh support get exec_user <name> -n <namespace>

# List
xcsh support list exec_user -n <namespace>

# Delete
xcsh support delete exec_user <name> -n <namespace>
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
