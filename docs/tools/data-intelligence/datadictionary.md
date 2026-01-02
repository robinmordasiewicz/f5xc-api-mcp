---
page_title: f5xc_datadictionary - f5xc-api-mcp
subcategory: Data Intelligence
description: GET Data Dictionary.
---

# Datadictionary

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the dataset features from Data dictionary API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-datadictionary-list` | GET Data Dictionary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dataset` | Dataset | `Di_advanced.` |

## Example Usage

Ask Claude to help you work with Datadictionary resources:

### List Datadictionarys

> "List all datadictionarys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh data_intelligence create datadictionary -n <namespace> -i datadictionary.yaml

# Get
xcsh data_intelligence get datadictionary <name> -n <namespace>

# List
xcsh data_intelligence list datadictionary -n <namespace>

# Delete
xcsh data_intelligence delete datadictionary <name> -n <namespace>
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
