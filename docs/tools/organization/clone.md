---
page_title: f5xc_clone - f5xc-api-mcp
subcategory: Organization
description: Clone Alert Template
---

# Clone

Clone the BRM Alert Template

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-clone-create` | Clone Alert Template |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Clone resources:

### Create Clone

> "Create a clone named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create clone -n <namespace> -i clone.yaml

# Get
f5xcctl configuration get clone -n <namespace> <name>

# List
f5xcctl configuration list clone -n <namespace>

# Delete
f5xcctl configuration delete clone -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_clone" "example" {
  name      = "example-clone"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
