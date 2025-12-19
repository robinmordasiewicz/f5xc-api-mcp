---
page_title: f5xc_data_exposure - f5xc-api-mcp
subcategory: Security
description: Suggest sensitive data rule
---

# Data Exposure

Suggest sensitive data rule for a given path

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-data-exposure-create` | Suggest sensitive data rule |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Data Exposure resources:

### Create Data Exposure

> "Create a data-exposure named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f data_exposure.yaml

# Get
f5xcctl get data_exposure {name} -n {namespace}

# List
f5xcctl get data_exposures -n {namespace}

# Delete
f5xcctl delete data_exposure {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_data_exposure" "example" {
  name      = "example-data-exposure"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
