---
page_title: f5xc_affectedUser - f5xc-api-mcp
subcategory: Shape
description: List Affected Users.
---

# AffectedUser

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List affected users who have loaded this particular script.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-affecteduser-create` | List Affected Users. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |
| `script_id` | Script_id | `S-1234567` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- affectedUser

## Example Usage

Ask Claude to help you work with AffectedUser resources:

### Create AffectedUser

> "Create a affectedUser named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create affectedUser -n <namespace> -i affectedUser.yaml

# Get
xcsh shape get affectedUser <name> -n <namespace>

# List
xcsh shape list affectedUser -n <namespace>

# Delete
xcsh shape delete affectedUser <name> -n <namespace>
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
