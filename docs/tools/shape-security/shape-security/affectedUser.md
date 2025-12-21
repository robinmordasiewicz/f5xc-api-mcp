---
page_title: f5xc_affectedUser - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: List Affected Users.
---

# AffectedUser

List affected users who have loaded this particular script.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-affecteduser-create` | List Affected Users. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `script_id` | Script_id |

## Example Usage

Ask Claude to help you work with AffectedUser resources:

### Create AffectedUser

> "Create a affectedUser named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create affectedUser -n <namespace> -i affectedUser.yaml

# Get
f5xcctl configuration get affectedUser -n <namespace> <name>

# List
f5xcctl configuration list affectedUser -n <namespace>

# Delete
f5xcctl configuration delete affectedUser -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_affectedUser" "example" {
  name      = "example-affectedUser"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
