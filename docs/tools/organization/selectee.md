---
page_title: f5xc_selectee - f5xc-api-mcp
subcategory: Organization
description: Get Selectees
---

# Selectee

Get the list of objects selected by this Virtual Site based on its selector label expression

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-selectee-get` | Get Selectees |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Selectee resources:

### Get Selectee Details

> "Get details of the selectee named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f selectee.yaml

# Get
f5xcctl get selectee {name} -n {namespace}

# List
f5xcctl get selectees -n {namespace}

# Delete
f5xcctl delete selectee {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_selectee" "example" {
  name      = "example-selectee"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
