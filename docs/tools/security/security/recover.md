---
page_title: f5xc_recover - f5xc-api-mcp
subcategory: Security
description: Recover secret policy with given policy name.
---

# Recover

Recoverpolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-recover-create` | Recover secret policy with given policy name. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Recover resources:

### Create Recover

> "Create a recover named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create recover -n <namespace> -i recover.yaml

# Get
f5xcctl security get recover <name> -n <namespace>

# List
f5xcctl security list recover -n <namespace>

# Delete
f5xcctl security delete recover <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_recover" "example" {
  name      = "example-recover"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
