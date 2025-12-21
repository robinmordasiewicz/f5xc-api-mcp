---
page_title: f5xc_data_exposure - f5xc-api-mcp
subcategory: API Security
description: Suggest sensitive data rule.
---

# Data Exposure

Suggest sensitive data rule for a given path.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-apisecurity-data-exposure-create` | Suggest sensitive data rule. |

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
f5xcctl api_security create data_exposure -n <namespace> -i data_exposure.yaml

# Get
f5xcctl api_security get data_exposure <name> -n <namespace>

# List
f5xcctl api_security list data_exposure -n <namespace>

# Delete
f5xcctl api_security delete data_exposure <name> -n <namespace>
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
