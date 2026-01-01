---
page_title: f5xc_softdelete - f5xc-api-mcp
subcategory: Blindfold
description: DELETE secret policy with given policy name.
---

# Softdelete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Deletepolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-softdelete-create` | DELETE secret policy with given policy name. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Site-secret-policy.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- softdelete

## Example Usage

Ask Claude to help you work with Softdelete resources:

### Create Softdelete

> "Create a softdelete named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh blindfold create softdelete -n <namespace> -i softdelete.yaml

# Get
xcsh blindfold get softdelete <name> -n <namespace>

# List
xcsh blindfold list softdelete -n <namespace>

# Delete
xcsh blindfold delete softdelete <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_softdelete" "example" {
  name      = "example-softdelete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
