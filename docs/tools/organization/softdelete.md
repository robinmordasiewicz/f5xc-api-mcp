---
page_title: f5xc_softdelete - f5xc-api-mcp
subcategory: Organization
description: Delete secret policy with given policy name
---

# Softdelete

Delete secret policy with given policy name

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-softdelete-create` | Delete secret policy with given policy name |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Softdelete resources:

### Create Softdelete

> "Create a softdelete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f softdelete.yaml

# Get
f5xcctl get softdelete {name} -n {namespace}

# List
f5xcctl get softdeletes -n {namespace}

# Delete
f5xcctl delete softdelete {name} -n {namespace}
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
