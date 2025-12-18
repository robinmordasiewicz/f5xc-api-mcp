---
page_title: f5xc_datadictionary - f5xc-api-mcp
subcategory: Organization
description: Get Data Dictionary
---

# Datadictionary

Get the dataset features from Data dictionary API

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-datadictionary-list` | Get Data Dictionary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dataset` | dataset |

## Example Usage

Ask Claude to help you work with Datadictionary resources:

### List Datadictionarys

> "List all datadictionarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f datadictionary.yaml

# Get
f5xcctl get datadictionary {name} -n {namespace}

# List
f5xcctl get datadictionarys -n {namespace}

# Delete
f5xcctl delete datadictionary {name} -n {namespace}
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
