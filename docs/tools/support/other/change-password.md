---
page_title: f5xc_change_password - f5xc-api-mcp
subcategory: Support
description: ChangePassword.
---

# Change Password

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Change host user password.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-change-password-create` | ChangePassword. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- change-password

## Example Usage

Ask Claude to help you work with Change Password resources:

### Create Change Password

> "Create a change-password named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl operate change-password create {name} --namespace {namespace}
```

Create change-password

### file_based

```bash
f5xcctl operate change-password create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create change_password -n <namespace> -i change_password.yaml

# Get
f5xcctl support get change_password <name> -n <namespace>

# List
f5xcctl support list change_password -n <namespace>

# Delete
f5xcctl support delete change_password <name> -n <namespace>
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
