---
page_title: f5xc_softdelete - f5xc-api-mcp
subcategory: Security
description: DELETE secret policy with given policy name.
---

# Softdelete

Deletepolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-softdelete-create` | DELETE secret policy with given policy name. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Softdelete resources:

### Create Softdelete

> "Create a softdelete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create softdelete -n <namespace> -i softdelete.yaml

# Get
f5xcctl security get softdelete <name> -n <namespace>

# List
f5xcctl security list softdelete -n <namespace>

# Delete
f5xcctl security delete softdelete <name> -n <namespace>
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
