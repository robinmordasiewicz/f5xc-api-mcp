---
page_title: f5xc_datadictionary - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Data Dictionary.
---

# Datadictionary

GET the dataset features from Data dictionary API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-datadictionary-list` | GET Data Dictionary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dataset` | Dataset |

## Example Usage

Ask Claude to help you work with Datadictionary resources:

### List Datadictionarys

> "List all datadictionarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create datadictionary -n <namespace> -i datadictionary.yaml

# Get
f5xcctl shape_security get datadictionary <name> -n <namespace>

# List
f5xcctl shape_security list datadictionary -n <namespace>

# Delete
f5xcctl shape_security delete datadictionary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_datadictionary" "example" {
  name      = "example-datadictionary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
