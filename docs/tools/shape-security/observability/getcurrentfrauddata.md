---
page_title: f5xc_getcurrentfrauddata - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GetCurrentFraudData.
---

# Getcurrentfrauddata

GET Current Fraud data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-getcurrentfrauddata-create` | GetCurrentFraudData. |

## Example Usage

Ask Claude to help you work with Getcurrentfrauddata resources:

### Create Getcurrentfrauddata

> "Create a getcurrentfrauddata named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create getcurrentfrauddata -n <namespace> -i getcurrentfrauddata.yaml

# Get
f5xcctl configuration get getcurrentfrauddata -n <namespace> <name>

# List
f5xcctl configuration list getcurrentfrauddata -n <namespace>

# Delete
f5xcctl configuration delete getcurrentfrauddata -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_getcurrentfrauddata" "example" {
  name      = "example-getcurrentfrauddata"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
