---
page_title: f5xc_recover - f5xc-api-mcp
subcategory: Sites
description: Recover secret policy with given policy name
---

# Recover

Recover secret policy with given policy name

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-recover-create` | Recover secret policy with given policy name |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Recover resources:

### Create Recover

> "Create a recover named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f recover.yaml

# Get
f5xcctl get recover {name} -n {namespace}

# List
f5xcctl get recovers -n {namespace}

# Delete
f5xcctl delete recover {name} -n {namespace}
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
